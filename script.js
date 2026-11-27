
/* =========================================
   PROJECTVERSE V3 - MAIN SCRIPT
   ========================================= */

// Wait until the page is ready
document.addEventListener("DOMContentLoaded", () => {

    console.log("ProjectVerse V3 loaded successfully.");

    // Smooth navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // AI Mentor demo
    const mentorButton = document.getElementById("mentorButton");

    const mentorQuestion = document.getElementById("mentorQuestion");

    const mentorResponse = document.getElementById("mentorResponse");

    if (mentorButton && mentorQuestion && mentorResponse) {

        mentorButton.addEventListener("click", () => {

            const question = mentorQuestion.value.trim();

            if (!question) {
                mentorResponse.textContent =
                    "Please enter your project idea first.";
                return;
            }

            mentorResponse.textContent =
                "Here is your starting roadmap: " +
                "1. Define your problem. " +
                "2. Identify your users. " +
                "3. Design your interface. " +
                "4. Build a small prototype. " +
                "5. Test and improve your project.";

        });

    }


    // Project search
    const projectSearch = document.getElementById("projectSearch");

    const projectCards = document.querySelectorAll(
        "#projectGrid .project-card"
    );

    if (projectSearch) {

        projectSearch.addEventListener("input", () => {

            const query = projectSearch.value.toLowerCase();

            projectCards.forEach(card => {

                const content = card.textContent.toLowerCase();

                card.hidden = !content.includes(query);

            });

        });

    }


    // Teammate search demo
    const teamSearch = document.getElementById("teamSearch");

    if (teamSearch) {

        teamSearch.addEventListener("input", () => {

            const query = teamSearch.value.toLowerCase();

            document.querySelectorAll(
                "#teammateGrid .project-card"
            ).forEach(card => {

                card.hidden = !card.textContent
                    .toLowerCase()
                    .includes(query);

            });

        });

    }

});
