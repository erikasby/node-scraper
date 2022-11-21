'use strict';

// This file is for client-side validation of:
// creating/editing articles,
// login page,
// register page

const form = document.querySelector('.form');
const login = document.querySelector('.login');
const register = document.querySelector('.register');
const articleForm = document.querySelector('.article-form');

// Error labels
let emailError,
    usernameError,
    passwordError,
    repeatPasswordError,
    titleError,
    secondaryTitleError,
    categoryError,
    subCategoryError,
    imageLinkError,
    articleContentError = null;

if (login) {
    usernameError = document.getElementById('username').previousElementSibling;
    passwordError = document.getElementById('password').previousElementSibling;
}

if (register) {
    emailError = document.getElementById('email').previousElementSibling;
    usernameError = document.getElementById('username').previousElementSibling;
    passwordError = document.getElementById('password').previousElementSibling;
    repeatPasswordError = document.getElementById('repeatPassword').previousElementSibling;
}

if (articleForm) {
    titleError = document.getElementById('title').previousElementSibling;
    secondaryTitleError = document.getElementById('secondaryTitle').previousElementSibling;
    categoryError = document.getElementById('category').previousElementSibling;
    subCategoryError = document.getElementById('subCategory').previousElementSibling;
    imageLinkError = document.getElementById('imageLink').previousElementSibling;
    articleContentError = document.getElementById('articleContent').previousElementSibling;
}

// Inputs
let email,
    username,
    password,
    repeatPassword,
    title,
    secondaryTitle,
    category,
    subCategory,
    imageLink,
    articleContent = null;

if (login) {
    username = document.getElementById('username');
    password = document.getElementById('password');
}

if (register) {
    email = document.getElementById('email');
    username = document.getElementById('username');
    password = document.getElementById('password');
    repeatPassword = document.getElementById('repeatPassword');
}

if (articleForm) {
    title = document.getElementById('title');
    console.log(title);
    secondaryTitle = document.getElementById('secondaryTitle');
    category = document.getElementById('category');
    subCategory = document.getElementById('subCategory');
    imageLink = document.getElementById('imageLink');
    articleContent = document.getElementById('articleContent');
}

// Event listeners
form.addEventListener('submit', (event) => validate(event));

if (login) {
    username.addEventListener('focus', (event) => elementToDefaultStyling(username, usernameError));
    password.addEventListener('focus', (event) => elementToDefaultStyling(password, passwordError));
}

if (register) {
    email.addEventListener('focus', (event) => elementToDefaultStyling(email, emailError));
    username.addEventListener('focus', (event) => elementToDefaultStyling(username, usernameError));
    password.addEventListener('focus', (event) => elementToDefaultStyling(password, passwordError));
    repeatPassword.addEventListener('focus', (event) => elementToDefaultStyling(repeatPassword, repeatPasswordError));
}

if (articleForm) {
    title.addEventListener('focus', (event) => elementToDefaultStyling(title, titleError));
    secondaryTitle.addEventListener('focus', (event) => elementToDefaultStyling(secondaryTitle, secondaryTitleError));
    category.addEventListener('focus', (event) => elementToDefaultStyling(category, categoryError));
    subCategory.addEventListener('focus', (event) => elementToDefaultStyling(subCategory, subCategoryError));
    imageLink.addEventListener('focus', (event) => elementToDefaultStyling(imageLink, imageLinkError));
    articleContent.addEventListener('focus', (event) => elementToDefaultStyling(articleContent, articleContentError));
}

// Helpers
const showError = (element, elementError, errorTextContent, event) => {
    elementError.textContent = errorTextContent;
    elementError.classList.add('form__error--active');
    element.classList.add('form__input--invalid');
    event.preventDefault();
};

const elementToDefaultStyling = (element, elementError) => {
    elementError.textContent = '';
    elementError.classList.remove('form__error--active');
    element.classList.remove('form__input--invalid');
};

// Validation
const validate = (event) => {
    let validated = true;

    if (login) {
        validated = validateUsername(event);
        if (!validated) return;

        validated = validatePassword(event);
        if (!validated) return;
    }

    if (register) {
        validated = validateEmail(event);
        if (!validated) return;

        validated = validateUsername(event);
        if (!validated) return;

        validated = validatePassword(event);
        if (!validated) return;

        validated = validateRepeatPassword(event);
        if (!validated) return;
    }

    if (articleForm) {
        validated = validateTitle(event);
        if (!validated) return;

        validated = validateSecondaryTitle(event);
        if (!validated) return;

        validated = validateCategory(event);
        if (!validated) return;

        validated = validateSubCategory(event);
        if (!validated) return;

        validated = validateImageLink(event);
        if (!validated) return;

        validated = validateArticleContent(event);
        if (!validated) return;
    }
};

const validateEmail = (event) => {
    if (email.validity.valueMissing) {
        const errorTextContent = `Email is required`;
        showError(email, emailError, errorTextContent, event);
        return;
    }

    if (email.validity.tooShort) {
        const errorTextContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}`;
        showError(email, emailError, errorTextContent, event);
        return;
    }

    if (email.validity.tooLong) {
        const errorTextContent = `Email should have no more than ${email.minLength} characters; you entered ${email.value.length}`;
        showError(email, emailError, errorTextContent, event);
        return;
    }

    if (email.validity.patternMismatch) {
        const errorTextContent = `Email should include @ and a domain`;
        showError(email, emailError, errorTextContent, event);
        return;
    }

    return true;
};

const validateUsername = (event) => {
    if (username.validity.valueMissing) {
        const errorTextContent = `Username is required`;
        showError(username, usernameError, errorTextContent, event);
        return;
    }

    if (username.validity.tooShort) {
        const errorTextContent = `Username should be at least ${username.minLength} characters; you entered ${username.value.length}`;
        showError(username, usernameError, errorTextContent, event);
        return;
    }

    if (username.validity.tooLong) {
        const errorTextContent = `Username should have no more than ${username.minLength} characters; you entered ${username.value.length}`;
        showError(username, usernameError, errorTextContent, event);
        return;
    }

    if (username.validity.patternMismatch) {
        const errorTextContent = `Username can only include numbers and letters`;
        showError(username, usernameError, errorTextContent, event);
        return;
    }

    return true;
};

const validatePassword = (event) => {
    if (password.validity.valueMissing) {
        const errorTextContent = `Password is required`;
        showError(password, passwordError, errorTextContent, event);
        return;
    }

    if (password.validity.tooShort) {
        const errorTextContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}`;
        showError(password, passwordError, errorTextContent, event);
        return;
    }

    if (password.validity.tooLong) {
        const errorTextContent = `Password should have no more than ${password.minLength} characters; you entered ${password.value.length}`;
        showError(password, passwordError, errorTextContent, event);
        return;
    }

    if (password.validity.patternMismatch) {
        const errorTextContent = `Password should atleast have 1 uppercase letter, 1 lowercase letter, 1 number, 1 symbol !@#$%^&*_=+-`;
        showError(password, passwordError, errorTextContent, event);
        return;
    }

    return true;
};

const validateRepeatPassword = (event) => {
    if (repeatPassword.validity.valueMissing) {
        const errorTextContent = `Password is required`;
        showError(repeatPassword, repeatPasswordError, errorTextContent, event);
        return;
    }

    if (password.value !== repeatPassword.value) {
        const errorTextContent = `Passwords do not match`;
        showError(password, passwordError, errorTextContent, event);
        showError(repeatPassword, repeatPasswordError, errorTextContent, event);
        return;
    }

    return true;
};

const validateTitle = (event) => {
    if (title.value.length < 10) {
        const errorTextContent = `Title should atleast be 10 characters long; you entered ${title.value.length}`;
        showError(title, titleError, errorTextContent, event);
        return;
    }

    return true;
};

const validateSecondaryTitle = (event) => {
    if (secondaryTitle.value.length < 10) {
        const errorTextContent = `Secondary title should atleast be 10 characters long; you entered ${secondaryTitle.value.length}`;
        showError(secondaryTitle, secondaryTitleError, errorTextContent, event);
        return;
    }

    return true;
};

const validateCategory = (event) => {
    // If this array is getting changed, then it should be also changed on the backend validation
    const categories = ['Technology', 'Business', 'Press', 'Lifestyle'];

    for (const cat of categories) {
        if (category.value === cat) {
            console.log(category.value, cat);
            return true;
        }
    }

    const errorTextContent = `Please, enter an existing category`;
    showError(category, categoryError, errorTextContent, event);
    return;
};

const validateSubCategory = (event) => {
    if (subCategory.value.length < 3) {
        const errorTextContent = `Subcategory should atleast be 3 characters long; you entered ${subCategory.value.length}`;
        showError(subCategory, subCategoryError, errorTextContent, event);
        return;
    }

    return true;
};

const validateImageLink = (event) => {
    if (imageLink.value.length < 10 || imageLink.value.includes('http') === false) {
        const errorTextContent = `Please, enter a valid image url`;
        showError(imageLink, imageLinkError, errorTextContent, event);
        return;
    }

    return true;
};

const validateArticleContent = (event) => {
    if (articleContent.value.length < 50) {
        const errorTextContent = `Article content should atleast be 50 characters long; you entered ${articleContent.value.length}`;
        showError(articleContent, articleContentError, errorTextContent, event);
        return;
    }

    return true;
};
