"use strict";


class FormValidation {

    constructor() {
        this.options = [
            {field: "name", regExp: /^[a-zа-яё]+$/i, errorText: "Имя должно содержать только буквы"},
            {field: "phone", regExp: /^\+7\(\d{3}\)\d{3}-\d{4}$/, errorText: "Введите телефон в формате +7(000)000-0000."},
            {field: "email", regExp: /^[\w\.-}]+@\w+\.[a-z]{2,4}$/i,
                errorText: "Введите email в формате mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru."
            }
        ];
        this.valid = false;
        this._unit()
    }


    _unit() {
        this.checkData();
        this.checkForm();
    }

    validateData(field, regExpr, errorText) {
        let fieldBlock = document.getElementById(`${field}`);
        if (!regExpr.test(fieldBlock.value)) {
            fieldBlock.classList.add("invalid");
            document.querySelector(`div.${field} div.validation`)
                .innerHTML = errorText;
            this.watchField(field, regExpr)
        }
    }

    checkData() {
        this.options.forEach((el) => {
            el.correct = this.validateData(el.field, el.regExp, el.errorText);
        })
    }
    checkForm() {
        if ([...document.querySelectorAll(".invalid")].length) {
            this.valid = true;
        }
    }

    watchField(field, regExpr) {
        let fieldBlock = document.getElementById(`${field}`);
        fieldBlock.addEventListener("input",
             () => {
                if (regExpr.test(fieldBlock.value)) {
                    fieldBlock.classList.remove("invalid");
                    document.querySelector(`div.${field} div.validation`)
                        .innerHTML = " ";
                }

            }

        )


    }
}

document.querySelector("#submit").addEventListener("click",
    (event) => {
        let validation = new FormValidation();
        if (validation.valid) {
            event.preventDefault()
        }

    }
);


/*
///
// ^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$
// /
// i
 onclick() {
     let button = document.getElementById("submit");
    button.addEventListener("click", event => console.log(event.target))
     // button.addEventListener("click", event => this.submitButtonHandler(event));
 },

 submitButtonHandler(event) {
     if (event.target.tagName == "BUTTON") {
         event.preventDefault();
         let name = document.getElementById("name");
         console.log(name.value);

     }

 }
 ,


 isNameValid() {

     return !this.name.length >= 1 || this.name.length < 50;
 }
 ,

*/











