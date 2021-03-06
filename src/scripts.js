document.addEventListener("DOMContentLoaded", function() {

    /////////////////// setup data /////////////////////////////////////////////
    const settings = {
        icons: {
            /* font awesome icons */

            location: 'fas fa-map-marker-alt',
            aboutMe: 'fas fa-user-circle',
            professions: 'far fa-file-alt', // file-alt, file-code
            skills: 'fas fa-cogs',
            languages: 'fas fa-globe',
            workExperience: 'fas fa-briefcase',
            mentionableProjects: 'far fa-object-group',
            hobbies: 'fas fa-basketball-ball',
            books: 'fas fa-book'
        }
    }

    const dataset = window.myCvDataset;
    const myCv = window.myCv;

    const boxes = [
        ['About me', myCv.createAboutMeContent(dataset.freeText.aboutMe)],
        ['Professions', myCv.createProfessionsContent(dataset.professionsI, dataset.professionsII)],
        ['Mentionable projects', myCv.createProjectsBox(dataset.projects)],
        ['Work Experience', myCv.createWorkExperienceBox(dataset.workExperiences)],
        ['Skills', myCv.createSkillsContent(dataset.skills, dataset.knowledgeLevelDescriptions)],
        ['Languages', myCv.createLanguagesContent(dataset.languages, dataset.languageLevelDescriptions)],
        ['Hobbies', myCv.createHobbiesBox(dataset.hobbies, dataset.books, 'Books', settings.icons.books)]
    ];

    // display CV content
    myCv.initPage(dataset.webPageTitle);
    myCv.initProfile(settings.icons.location, dataset.name, dataset.portrait, dataset.contacts.location, dataset.freeText.motto, dataset.contacts.email, dataset.contacts.socials);
    myCv.initStructure(boxes, settings.icons);
});
