/**
 * Bootbox dialogs plugin
 * Class: jaxon.dialog.libs.bootbox
 */

jaxon.dom.ready(() => jaxon.dialog.register('bootbox', (self, options, utils) => {
    // Dialogs options
    const {
        labels,
        modal: modalOptions = {},
        alert: alertOptions = {},
        confirm: confirmOptions = {},
    } = options;

    /**
     * @var {object}
     */
    const dialog = {
        dom: null,
    };
    const btnClasses = {
        primary: 'btn-primary',
        danger: 'btn-danger',
        default: 'btn-secondary',
    };

    /**
     * Show the modal dialog
     *
     * @param {object} dialog The dialog parameters
     * @param {string} dialog.title The dialog title
     * @param {string} dialog.content The dialog HTML content
     * @param {array} dialog.buttons The dialog buttons
     * @param {array} dialog.options The dialog options
     * @param {function} cbDomElement A callback to call with the DOM element of the dialog content
     *
     * @returns {object}
     */
    self.show = ({ title, content, buttons, options }, cbDomElement) => {
        let btnIndex = 1;
        const oButtons = {};
        buttons.forEach(({ title: label, class: btnClass, click }) => {
            className = btnClasses[btnClass] ?? btnClasses.default;
            if (!utils.isObject(click)) {
                oButtons.cancel = {label, className };
                return;
            }
            oButtons[`btn${btnIndex++}`] = {
                label,
                className,
                callback: () => {
                    utils.js(click);
                    return false; // Do not close the dialog.
                },
            };
        });
        dialog.dom = bootbox.dialog({
            ...modalOptions,
            ...options,
            title,
            message: content !== '' ? content : '&nbsp;',
            buttons: oButtons,
        });
        // Pass the js content element to the callback.
        cbDomElement(dialog.dom.get(0));
    };

    /**
     * Hide the modal dialog
     *
     * @returns {void}
     */
    self.hide = () => {
        if ((dialog.dom)) {
            dialog.dom.modal('hide');
            dialog.dom = null;
        }
    };

    const xTypes = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'danger',
    };

    /**
     * Show an alert message
     *
     * @param {object} alert The alert parameters
     * @param {string} alert.type The alert type
     * @param {string} alert.message The alert message
     * @param {string} alert.title The alert title
     *
     * @returns {void}
     */
    self.alert = ({ type, message, title }) => {
        message = '<div class="alert alert-' + (xTypes[type] ?? xTypes.info) +
            '" style="margin-top:15px;margin-bottom:-15px;">' +
            (!message ? '' : '<strong>' + title + '</strong><br/>') + message + '</div>';
        bootbox.alert({ ...alertOptions, message });
    };

    /**
     * Ask a confirm question to the user.
     *
     * @param {object} confirm The confirm parameters
     * @param {string} confirm.question The question to ask
     * @param {string} confirm.title The question title
     * @param {object} callback The confirm callbacks
     * @param {callback} callback.yes The function to call if the answer is yes
     * @param {callback=} callback.no The function to call if the answer is no
     *
     * @returns {void}
     */
    self.confirm = ({ question, title }, { yes: yesCb, no: noCb = () => {} }) => bootbox.confirm({
        ...confirmOptions,
        title: title,
        message: question,
        buttons: {
            cancel: {label: labels.no},
            confirm: {label: labels.yes}
        },
        callback: (res) => {
            res ? yesCb() : noCb();
        },
    });
}));

/*
 * Bootstrap 5 dialogs plugin
 * Class: jaxon.dialog.libs.bootstrap5
 */

jaxon.dom.ready(() => jaxon.dialog.register('bootstrap5', (self, options, utils) => {
    // Dialogs options
    const {
        modal: modalOptions = {},
    } = options;

    // Create the DOM element for the modal
    if(!utils.jq('#bootstrap5ModalContainer').length)
    {
        utils.jq('body').append('<div id="bootstrap5ModalContainer"></div>');
    }

    const modal = {
        container: document.getElementById('bootstrap5ModalContainer'),
        id: 'bootstrap5Modal',
    };
    const btnClasses = {
        primary: 'class="btn btn-primary"',
        danger: 'class="btn btn-danger"',
        default: 'class="btn btn-secondary"',
    };

    const encodeHandler = (click) => JSON.stringify(click)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const getHtml = (title, content, buttons) => {
        buttons = buttons
            .map(({ title, class: btnClass, click }) => {
                btnClass = btnClasses[btnClass] ?? btnClasses.default;
                const attrs = click === 'close' ? 'data-bs-dismiss="modal"' :
                    `jxn-click="${encodeHandler(click)}"`;
                return `<button type="button" ${btnClass} ${attrs}>${title}</button>`;
            })
            .reduce((html, button) => html + button, '');

        return `
<div id="${modal.id}" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ${content !== '' ? content : '&nbsp;'}
            </div>
            <div class="modal-footer">
                ${buttons}
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
`;
    };

    /**
     * Show the modal dialog
     *
     * @param {object} dialog The dialog parameters
     * @param {string} dialog.title The dialog title
     * @param {string} dialog.content The dialog HTML content
     * @param {array} dialog.buttons The dialog buttons
     * @param {array} dialog.options The dialog options
     * @param {function} cbDomElement A callback to call with the DOM element of the dialog content
     *
     * @returns {object}
     */
    self.show = ({ title, content, buttons, options }, cbDomElement) => {
        modal.container.innerHTML = getHtml(title, content, buttons);
        const element = document.getElementById(modal.id);
        modal.instance = new bootstrap.Modal(element, {...modalOptions, ...options});
        // Pass the js content element to the callback.
        element.addEventListener('shown.bs.modal', () => cbDomElement(modal.container));
        // Show the modal.
        modal.instance.show();
    };

    /**
     * Hide the modal dialog
     *
     * @returns {void}
     */
    self.hide = () => modal.instance?.hide();
}));

/*
 * Bulma dialogs plugin
 * Class: jaxon.dialog.libs.bulma
 */

jaxon.dom.ready(() => jaxon.dialog.register('bulma', (self, options, utils) => {
    // Dialogs options
    const {
        modal: modalOptions = {},
    } = options;

    const modal = {
        instance: null,
        dialogId: 'bulma-modal-container',
        closeClass: 'bulma-modal-close',
    };
    const btnClasses = {
        primary: 'button is-primary',
        danger: 'button is-danger',
        default: 'button',
    };

    // Create the DOM element for the modal
    if(!utils.jq(`#${modal.dialogId}`).length)
    {
        utils.jq('body').append(`<div id="${modal.dialogId}" class="modal"></div>`);
    }

    modal.instance = document.getElementById(modal.dialogId);
    modal.closeSelector = `#${modal.dialogId} .${modal.closeClass}`;

    const encodeHandler = (click) => JSON.stringify(click)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const getHtml = (title, content, buttons) => {
        buttons = buttons
            .map(({ title, class: btnClass, click }) => {
                btnClass = btnClasses[btnClass] ?? btnClasses.default;
                const attrs = click === 'close' ?
                    `class="${btnClass} ${modal.closeClass}"` :
                    `class="${btnClass}" jxn-click="${encodeHandler(click)}"`;
                return `<button type="button" ${attrs}>${title}</button>`;
            })
            .reduce((html, button) => html + button, '');

        return `
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">${title}</p>
      <button class="delete ${modal.closeClass}" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      ${content !== '' ? content : '&nbsp;'}
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        ${buttons}
      </div>
    </footer>
  </div>
`;
    };

    /**
     * Show the modal dialog
     *
     * @param {object} dialog The dialog parameters
     * @param {string} dialog.title The dialog title
     * @param {string} dialog.content The dialog HTML content
     * @param {array} dialog.buttons The dialog buttons
     * @param {array} dialog.options The dialog options
     * @param {function} cbDomElement A callback to call with the DOM element of the dialog content
     *
     * @returns {object}
     */
    self.show = ({ title, content, buttons, options }, cbDomElement) => {
        self.hide();

        modal.instance.innerHTML = getHtml(title, content, buttons);
        const btns = document.querySelectorAll(modal.closeSelector);
        Array.from(btns).forEach((btn) => btn.addEventListener("click", self.hide));
        // Pass the js content element to the callback.
        cbDomElement(modal.instance);
        // Show the modal.
        modal.instance.classList.add("is-active");
    };

    /**
     * Hide the modal dialog
     *
     * @returns {void}
     */
    self.hide = () => modal.instance?.classList.remove("is-active");
}));

/**
 * Class: jaxon.dialog.libs.sweetalert
 */

jaxon.dom.ready(() => jaxon.dialog.register('sweetalert', (self, options) => {
    // Dialogs options
    const {
        labels,
        alert: alertOptions = {},
        confirm: confirmOptions = {},
    } = options;

    const xTypes = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error',
    };

    /**
     * Show an alert message
     *
     * @param {object} alert The alert parameters
     * @param {string} alert.type The alert type
     * @param {string} alert.message The alert message
     * @param {string} alert.title The alert title
     *
     * @returns {void}
     */
    self.alert = ({ type, message, title }) => Swal.fire({
        ...alertOptions,
        text: message,
        title: title ?? '',
        icon: xTypes[type] ?? xTypes.info,
    });

    /**
     * Ask a confirm question to the user.
     *
     * @param {object} confirm The confirm parameters
     * @param {string} confirm.question The question to ask
     * @param {string} confirm.title The question title
     * @param {object} callback The confirm callbacks
     * @param {callback} callback.yes The function to call if the answer is yes
     * @param {callback=} callback.no The function to call if the answer is no
     *
     * @returns {void}
     */
    self.confirm = ({ question, title }, { yes: yesCb, no: noCb = () => {} }) => Swal.fire({
        ...confirmOptions,
        icon: "question",
        title,
        text: question,
        showCancelButton: true,
        confirmButtonText: labels.yes,
        cancelButtonText: labels.no,
        reverseButtons: true,
    }).then((result) => {
        result.isConfirmed ? yesCb() : noCb();
    });
}));

/**
 * Class: jaxon.dialog.libs.cute
 */

jaxon.dom.ready(() => jaxon.dialog.register('cute', (self, options) => {
    // Dialogs options
    const {
        labels,
        alert: alertOptions = {},
        confirm: confirmOptions = {},
    } = options;

    const xTypes = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error',
    };

    /**
     * Show an alert message
     *
     * @param {object} alert The alert parameters
     * @param {string} alert.type The alert type
     * @param {string} alert.message The alert message
     * @param {string} alert.title The alert title
     *
     * @returns {void}
     */
    self.alert = ({ type, message, title }) => cuteAlert({
        ...alertOptions,
        message,
        title: title ?? '&nbsp;',
        type: xTypes[type] ?? xTypes.info,
    });

    /**
     * Ask a confirm question to the user.
     *
     * @param {object} confirm The confirm parameters
     * @param {string} confirm.question The question to ask
     * @param {string} confirm.title The question title
     * @param {object} callback The confirm callbacks
     * @param {callback} callback.yes The function to call if the answer is yes
     * @param {callback=} callback.no The function to call if the answer is no
     *
     * @returns {void}
     */
    self.confirm = ({ question, title }, { yes: yesCb, no: noCb = () => {} }) => cuteAlert({
        ...confirmOptions,
        title,
        type: 'question',
        message: question,
        confirmText: labels.yes,
        cancelText: labels.no,
    }).then(res => {
        res === 'confirm' ? yesCb() : noCb();
    });
}));

/**
 * Class: jaxon.dialog.libs.notyf
 */

jaxon.dom.ready(() => jaxon.dialog.register('notyf', (self, options) => {
    // Dialogs options
    const {
        alert: alertOptions = {},
    } = options;

    const xTypes = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error',
    };

    /*
     * Todo: Define a custom icon for the warning and info messages,
     * and re-enable the default one on the success and error messages.
     */
    const notyf = new Notyf({
        duration: 5000,
        ripple: false,
        dismissible: true,
        position: { x: 'center', y: 'top' },
        types: [{
            type: 'success',
            className: 'notyf__toast--success',
            backgroundColor: '#3dc763',
            icon: false,
            // icon: {
            //     className: 'notyf__icon--success',
            //     tagName: 'i',
            // },
        }, {
            type: 'error',
            className: 'notyf__toast--error',
            backgroundColor: '#ed3d3d',
            icon: false,
            // icon: {
            //     className: 'notyf__icon--error',
            //     tagName: 'i',
            // },
        },{
            type: 'warning',
            background: '#FEBE10',
            icon: false,
            // icon: {
            //     className: 'material-icons',
            //     tagName: 'i',
            //     color: 'white',
            //     text: 'i',
            // },
        }, {
            type: 'info',
            background: '#318CE7',
            icon: false,
        }],
        ...alertOptions,
    });

    /**
     * Show an alert message
     *
     * @param {object} alert The alert parameters
     * @param {string} alert.type The alert type
     * @param {string} alert.message The alert message
     * @param {string} alert.title The alert title
     *
     * @returns {void}
     */
    self.alert = ({ type, message, title }) => {
        notyf.open({ type: xTypes[type] ?? xTypes.info, message });
    };
}));
