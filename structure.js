(function () {
    if (!('content' in document.createElement('template'))) {
        alert('Your prehistoric version of web browser doesn\'t support this page :(');
        return;
    }

    /////////////////// Generic ////////////////////////////////////////////////

    function cloneTemplateContent(templateSelector) {
        let template = document.querySelector(templateSelector);
        let instance = document.importNode(template.content, true);

        return instance;
    }

    function createInfoBox(icon, title, htmlContent) {
        let infoBox = cloneTemplateContent('#templateInfoBox');

        infoBox.querySelector('.title').textContent = title;
        infoBox.querySelector('.anchorInfoContent').appendChild(htmlContent);
        infoBox.querySelector('.iconAnchor').appendChild(createIcon(icon));

        return infoBox;
    }

    function createIcon(icon) {
        let iconElement = document.createElement('i');
        iconElement.className = icon;

        return iconElement;
    }

    function createTitleLink(container, name, url) {
        if (!url) {
            container.textContent = name;
            return;
        }

        let title = document.createElement('a');
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

        let anchor = document.querySelector('.anchorInfoBox');
        for (let i = 0; i < boxes.length; i++) {
            // select icon
            let name = camelizeString(boxes[i][0]);
            let icon = icons[name];

            // create box
            let infoBox = createInfoBox.apply(null, [icon].concat(boxes[i]));
            anchor.appendChild(infoBox);
        }
    }


    /////////////////// Profile ////////////////////////////////////////////////
    function initProfile(locationIcon, name, portrait, location, motto, email, socials) {
        let container = document.querySelector('.leftColumn.profile');

        // misc
        container.querySelector('.name').textContent = name;
        container.querySelector('.personalImageContainer img').src = portrait;
        container.querySelector('.location .iconAnchor').appendChild(createIcon(locationIcon));
        container.querySelector('.location .text').textContent = location;
        container.querySelector('.motto').textContent = motto;

        // email
        let emailLink = container.querySelector('.email .mailtoLink');
        emailLink.href = 'mailto:' + email;
        emailLink.textContent = email;

        // socials
        let socialsContainer = container.querySelector('.anchorSocials');
        let socialsString = socials.forEach((item) => {
            let link = document.createElement('a');
            link.href = item[1];
            link.textContent = item[0];
            link.target = '_blank';
            link.rel = 'nofollow'

            return socialsContainer.appendChild(link);
        });
    }


    /////////////////// About me ///////////////////////////////////////////////
    function createAboutMeContent(aboutMe) {
        let instance = cloneTemplateContent('#templateAboutMe');

        instance.querySelector('.aboutMe').innerHTML = aboutMe;

        return instance;
    }


    /////////////////// Professions ////////////////////////////////////////////
    function createProfessionsContent(professionsI, professionsII) {
        let instance = cloneTemplateContent('#templateProfessions');

        // first profession layer
        let anchorProfessionsI = instance.querySelector('.anchorProfessionsI');
        for (let i = 0; i < professionsI.length; i++) {
            let tmp = createProfessionItem.apply(null, professionsI[i]);
            anchorProfessionsI.appendChild(tmp);
        }

        // second profession layer
        let anchorProfessionsII = instance.querySelector('.anchorProfessionsII');
        for (let i = 0; i < professionsII.length; i++) {
            let tmp = createProfessionItem.apply(null, professionsII[i]);
            anchorProfessionsII.appendChild(tmp);
        }

        return instance;
    }

    function createProfessionItem(name, yearCount) {
        let instance = cloneTemplateContent('#templateProfessionItem');

        instance.querySelector('.yearCount').textContent = yearCount;
        instance.querySelector('.name').textContent = name;

        return instance;
    }

    /////////////////// Skills & Languages /////////////////////////////////////
    function createSkillsContent(skills, knowledgeDescriptions) {
        let instance = cloneTemplateContent('#templateSkills');
        let anchor = instance.querySelector('.anchorSkills');
        createSkillOrLanguageContent(anchor, skills, knowledgeDescriptions);

        return instance;
    }

    function createLanguagesContent(languages, knowledgeDescriptions) {
        let instance = cloneTemplateContent('#templateLanguages');
        let anchor = instance.querySelector('.anchorLanguages');
        createSkillOrLanguageContent(anchor, languages, knowledgeDescriptions);

        return instance;
    }

    function createSkillOrLanguageContent(anchor, knowledgeData, knowledgeDescriptions) {
        for (let i = 0; i < knowledgeData.length; i++) {
            let tmp = createKnowledgeItem.apply(null, knowledgeData[i].concat([knowledgeDescriptions]));
            anchor.appendChild(tmp);
        }
    }

    function createKnowledgeItem(name, levelDescription, knowledgeDescriptions) {
        let instance = cloneTemplateContent('#templateKnowledgeItem');

        instance.querySelector('.iconText').textContent = name.charAt(0);
        instance.querySelector('.name').textContent = name;
        instance.querySelector('.dotOuter').style.left = (levelDescription * 32) + '%'; // slider position
        instance.querySelector('.levelText').textContent = knowledgeDescriptions[levelDescription];

        return instance;
    }


    /////////////////// Work Experiences ///////////////////////////////////////
    function createWorkExperienceBox(workExperiences) {
        let instance = cloneTemplateContent('#templateWorkExperiences');
        let anchor = instance.querySelector('.anchorWorkExperiences');

        for (let i = 0; i < workExperiences.length; i++) {
            let tmp = createWorkExperienceItem.apply(null, workExperiences[i].concat([i]));
            anchor.appendChild(tmp);
        }

        return instance;
    }

    function createWorkExperienceItem(name, url, duration, position, description, itemIndex) {
        let instance = cloneTemplateContent('#templateWorkExperienceItem');

        createTitleLink(instance.querySelector('.name'), name, url);
        instance.querySelector('.iconText').textContent = '#' + (itemIndex + 1);
        instance.querySelector('.yearInterval').textContent = duration;
        instance.querySelector('.position').textContent = position;
        instance.querySelector('.description').innerHTML = description;

        return instance;
    }


    /////////////////// Projects ///////////////////////////////////////////////
    function createProjectsBox(projects) {
        let instance = cloneTemplateContent('#templateProjects');
        let anchor = instance.querySelector('.anchorProjects');

        for (let i = 0; i < projects.length; i++) {
            let tmp = createProjectItem.apply(null, [i].concat(projects[i]));
            anchor.appendChild(tmp);
        }

        return instance;
    }

    function createProjectItem(itemIndex, name, url, description, technologyUsed, notableMetrics) {
        let instance = cloneTemplateContent('#templateProjectItem');

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
        let instance = cloneTemplateContent('#templateHobbies');

        // hobbies
        let anchor = instance.querySelector('.anchorHobbies');
        hobbies.forEach((item) => {
            anchor.appendChild(createHobbyItem(item));
        });

        // books
        anchor = instance.querySelector('.anchorBooks');
        books.forEach((item) => {
            anchor.appendChild(createHobbyItem(item));
        });
        instance.querySelector('.booksTitle').textContent = bookSectionName;
        instance.querySelector('.booksIcon').appendChild(createIcon(bookIcon));

        return instance;
    }

    function createHobbyItem(name) {
        let instance = cloneTemplateContent('#templateHobbyItem');

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
