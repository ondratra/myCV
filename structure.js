(function () {
    if (!('content' in document.createElement('template'))) {
        alert('Your prehistoric version of web browser doesn\'t support this page :(');
        return;
    }

    /////////////////// Generic ////////////////////////////////////////////////

    function cloneTemplateContent(templateSelector) {
        const template = document.querySelector(templateSelector);
        const instance = document.importNode(template.content, true);

        return instance;
    }

    function createInfoBox(icon, title, htmlContent) {
        const infoBox = cloneTemplateContent('#templateInfoBox');

        infoBox.querySelector('.title').textContent = title;
        infoBox.querySelector('.anchorInfoContent').appendChild(htmlContent);
        infoBox.querySelector('.iconAnchor').appendChild(createIcon(icon));

        return infoBox;
    }

    function createIcon(icon) {
        const iconElement = document.createElement('i');
        iconElement.className = icon;

        return iconElement;
    }

    function createTitleLink(container, name, url) {
        if (!url) {
            container.textContent = name;
            return;
        }

        const title = document.createElement('a');
        title.href = url;
        title.textContent = name;
        title.target = '_blank';
        title.rel = 'nofollow'
        container.appendChild(title);
    }

    function initPage(title) {
        document.querySelector('.webPageTitle').textContent = title;
    }

    function initStructure(boxes, icons) {
        const camelizeString = (str) => {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        };

        const anchor = document.querySelector('.anchorInfoBox');
        for (let i = 0; i < boxes.length; i++) {
            // select icon
            const name = camelizeString(boxes[i][0]);
            const icon = icons[name];

            // create box
            const infoBox = createInfoBox.apply(null, [icon].concat(boxes[i]));
            anchor.appendChild(infoBox);
        }
    }


    /////////////////// Profile ////////////////////////////////////////////////
    function initProfile(locationIcon, name, portrait, location, motto, email, socials) {
        const container = document.querySelector('.leftColumn.profile');

        // misc
        container.querySelector('.name').textContent = name;
        container.querySelector('.personalImageContainer img').src = portrait;
        container.querySelector('.location .iconAnchor').appendChild(createIcon(locationIcon));
        container.querySelector('.location .text').textContent = location;
        container.querySelector('.motto').textContent = motto;

        // email
        const emailLink = container.querySelector('.email .mailtoLink');
        emailLink.href = 'mailto:' + email;
        emailLink.textContent = email;

        // socials
        const socialsContainer = container.querySelector('.anchorSocials');
        const socialsString = socials.forEach((item) => {
            const link = document.createElement('a');
            link.href = item[1];
            link.textContent = item[0];
            link.target = '_blank';
            link.rel = 'nofollow'

            return socialsContainer.appendChild(link);
        });
    }


    /////////////////// About me ///////////////////////////////////////////////
    function createAboutMeContent(aboutMe) {
        const instance = cloneTemplateContent('#templateAboutMe');

        let content = aboutMe
            .trim()
            .split('\n\n')
            .map(item => `<p>${item}</p>`)
            .join('')

        instance.querySelector('.aboutMe').innerHTML = content;

        return instance;
    }


    /////////////////// Professions ////////////////////////////////////////////
    function createProfessionsContent(professionsI, professionsII) {
        const instance = cloneTemplateContent('#templateProfessions');

        // first profession layer
        const anchorProfessionsI = instance.querySelector('.anchorProfessionsI');
        for (let i = 0; i < professionsI.length; i++) {
            const tmp = createProfessionItem.apply(null, professionsI[i]);
            anchorProfessionsI.appendChild(tmp);
        }

        // second profession layer
        const anchorProfessionsII = instance.querySelector('.anchorProfessionsII');
        for (let i = 0; i < professionsII.length; i++) {
            const tmp = createProfessionItem.apply(null, professionsII[i]);
            anchorProfessionsII.appendChild(tmp);
        }

        return instance;
    }

    function createProfessionItem(name, yearCount) {
        const instance = cloneTemplateContent('#templateProfessionItem');

        instance.querySelector('.yearCount').textContent = yearCount;
        instance.querySelector('.name').textContent = name;

        return instance;
    }

    /////////////////// Skills & Languages /////////////////////////////////////
    function createSkillsContent(skills, knowledgeDescriptions) {
        const instance = cloneTemplateContent('#templateSkills');
        const anchor = instance.querySelector('.anchorSkills');
        createSkillOrLanguageContent(anchor, skills, knowledgeDescriptions);

        return instance;
    }

    function createLanguagesContent(languages, knowledgeDescriptions) {
        const instance = cloneTemplateContent('#templateLanguages');
        const anchor = instance.querySelector('.anchorLanguages');
        createSkillOrLanguageContent(anchor, languages, knowledgeDescriptions);

        return instance;
    }

    function createSkillOrLanguageContent(anchor, knowledgeData, knowledgeDescriptions) {
        for (let i = 0; i < knowledgeData.length; i++) {
            const tmp = createKnowledgeItem.apply(null, knowledgeData[i].concat([knowledgeDescriptions]));
            anchor.appendChild(tmp);
        }
    }

    function createKnowledgeItem(name, levelDescription, knowledgeDescriptions) {
        const instance = cloneTemplateContent('#templateKnowledgeItem');

        instance.querySelector('.iconText').textContent = name.charAt(0);
        instance.querySelector('.name').textContent = name;
        instance.querySelector('.dotOuter').style.left = (levelDescription * 32) + '%'; // slider position
        instance.querySelector('.levelText').textContent = knowledgeDescriptions[levelDescription];

        return instance;
    }


    /////////////////// Work Experiences ///////////////////////////////////////
    function createWorkExperienceBox(workExperiences) {
        const instance = cloneTemplateContent('#templateWorkExperiences');
        const anchor = instance.querySelector('.anchorWorkExperiences');

        for (let i = 0; i < workExperiences.length; i++) {
            const tmp = createWorkExperienceItem.apply(null, workExperiences[i].concat([i]));
            anchor.appendChild(tmp);
        }

        return instance;
    }

    function createWorkExperienceItem(name, url, duration, position, description, itemIndex) {
        const instance = cloneTemplateContent('#templateWorkExperienceItem');

        createTitleLink(instance.querySelector('.name'), name, url);
        instance.querySelector('.iconText').textContent = '#' + (itemIndex + 1);
        instance.querySelector('.yearInterval').textContent = duration;
        instance.querySelector('.position').textContent = position;
        instance.querySelector('.description').innerHTML = description;

        return instance;
    }


    /////////////////// Projects ///////////////////////////////////////////////
    function createProjectsBox(projects) {
        const instance = cloneTemplateContent('#templateProjects');
        const anchor = instance.querySelector('.anchorProjects');

        for (let i = 0; i < projects.length; i++) {
            const tmp = createProjectItem.apply(null, [i].concat(projects[i]));
            anchor.appendChild(tmp);
        }

        return instance;
    }

    function createProjectItem(itemIndex, name, url, description, technologyUsed, notableMetrics) {
        const instance = cloneTemplateContent('#templateProjectItem');

        createTitleLink(instance.querySelector('.name'), name, url);
        instance.querySelector('.iconText').textContent = '#' + (itemIndex + 1);
        instance.querySelector('.description').innerHTML = description;

        const conditionalContent = (selectorContainer, selectorContent, text) => {
            const container = instance.querySelector(selectorContainer)
            if (!text) {
                container.style.display = 'none'
                return
            }
            container.querySelector(selectorContent).innerHTML = text
        }

        conditionalContent('.technologyUsed', '.content', technologyUsed)
        conditionalContent('.notableMetrics', '.content', notableMetrics)

        return instance;
    }


    /////////////////// Hobbies ////////////////////////////////////////////////
    function createHobbiesBox(hobbies, books, bookSectionName, bookIcon) {
        const instance = cloneTemplateContent('#templateHobbies');

        // hobbies
        const hobbyAnchor = instance.querySelector('.anchorHobbies');
        hobbies.forEach((item) => {
            hobbyAnchor.appendChild(createHobbyItem(item));
        });

        // books
        const bookAnchor = instance.querySelector('.anchorBooks');
        books.forEach((item) => {
            bookAnchor.appendChild(createHobbyItem(item));
        });
        instance.querySelector('.booksTitle').textContent = bookSectionName;
        instance.querySelector('.booksIcon').appendChild(createIcon(bookIcon));

        return instance;
    }

    function createHobbyItem(name) {
        const instance = cloneTemplateContent('#templateHobbyItem');

        instance.querySelector('.name').textContent = name;

        return instance;
    }


    /////////////////// Register public functions //////////////////////////////
    window.myCv = {
        initPage,
        initProfile,
        initStructure,

        createAboutMeContent,
        createProfessionsContent,
        createSkillsContent,
        createLanguagesContent,
        createWorkExperienceBox,
        createProjectsBox,
        createHobbiesBox,
    };
})();
