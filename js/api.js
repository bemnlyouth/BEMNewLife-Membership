// ======================================
// API FUNCTIONS
// Handles communication with Cloudflare
// ======================================


async function submitMember(data) {


    try {


        const response = await fetch(
            API_URL,
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },


                body: JSON.stringify(data)

            }
        );


        const result = await response.json();


        return result;


    }

    catch(error){


        console.error(
            "API Error:",
            error
        );


        return {

            success:false,

            message:error.message

        };


    }


}


// =========================================
// SELECT CONTAINER WHERE QUESTIONS WILL APPEAR
// =========================================
const container = document.getElementById("questionsContainer");


// =========================================
// LOAD QUESTIONS FROM questions.json
// =========================================
fetch("data/question.json")
.then(response => {

    // Check if file loads correctly
    if (!response.ok) {
        throw new Error("❌ Cannot load question.json. Check file path.");
    }

    return response.json();
})

.then(data => {

    console.log("✅ Questions loaded successfully:", data);

    // Loop through each question from JSON
    data.forEach(question => {

        // =========================================
        // CREATE LABEL (QUESTION TEXT)
        // =========================================
        const label = document.createElement("label");
        label.textContent = question.label;

        // =========================================
        // CREATE INPUT FIELD
        // =========================================
        const input = document.createElement("input");

        // Input type (text, email, number, etc.)
        input.type = question.type;

        // Unique ID (important for future saving)
        input.id = question.id;

        // Required field (true/false)
        input.required = question.required;

        // Placeholder text (if exists)
        input.placeholder = question.placeholder || "";

        // =========================================
        // APPEND ELEMENTS TO PAGE
        // =========================================
        container.appendChild(label);
        container.appendChild(input);
    });
})

.catch(error => {

    // Show error in console if something fails
    console.error("❌ Error loading form:", error);

    // Optional: show user-friendly message on page
    container.innerHTML = `
        <p style="color:red;">
            Failed to load questions. Please check console.
        </p>
    `;
});


// ======================================
// FORM SUBMISSION
// Send data to Cloudflare Worker
// ======================================


document
.getElementById("surveyForm")
.addEventListener(
"submit",

async function(event){


    event.preventDefault();



    const formData = {};



    // Collect all answers

    document
    .querySelectorAll(
        "#questionsContainer input"
    )
    .forEach(input => {


        formData[input.id] =
        input.value;


    });



    console.log(
        "Submitting:",
        formData
    );



    const result =
    await submitMember(
        formData
    );



    console.log(
        "Server response:",
        result
    );



    if(result.success){


        alert(
            "Registration successful!"
        );


        this.reset();


    }

    else {


        alert(
            "Submission failed: "
            +
            result.message
        );


    }



});