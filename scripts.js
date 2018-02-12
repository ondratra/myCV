document.addEventListener("DOMContentLoaded", function() {

    let settings = {
        icons: {
            /* font awesome icons */

            location: 'fas fa-map-marker-alt',
            aboutMe: 'fas fa-user-circle',
            professions: 'far fa-file-alt', // file-alt, file-code
            skills: 'fas fa-cogs',
            languages: 'fas fa-globe',
            workExperience: 'fas fa-briefcase',
            projects: 'far fa-object-group',
            hobbies: 'fas fa-basketball-ball',
            books: 'fas fa-book'
        }
    }

    let dataset = window.myCvDataset;
    let myCv = window.myCv;

    let boxes = [
        ['About me', myCv.createAboutMeContent(dataset.freeText.aboutMe)],
        ['Professions', myCv.createProfessionsContent(dataset.professionsI, dataset.professionsII)],
        ['Skills', myCv.createSkillsContent(dataset.skills, dataset.knowledgeLevelDescriptions)],
        ['Languages', myCv.createLanguagesContent(dataset.languages, dataset.languageLevelDescriptions)],
        ['Work Experience', myCv.createWorkExperienceBox(dataset.workExperiences)],
        ['Projects', myCv.createProjectsBox(dataset.projects)],
        ['Hobbies', myCv.createHobbiesBox(dataset.hobbies, dataset.books, 'Books', settings.icons.books)]
    ];

    myCv.initPage(dataset.webPageTitle);
    myCv.initProfile(settings.icons.location, dataset.name, dataset.portrait, dataset.contacts.location, dataset.freeText.motto, dataset.contacts.email, dataset.contacts.socials);
    myCv.initStructure(boxes, settings.icons);
});
