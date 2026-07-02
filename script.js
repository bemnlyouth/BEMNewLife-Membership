// =========================================
// SELECT CONTAINER WHERE QUESTIONS WILL APPEAR
// =========================================
const container = document.getElementById("questionsContainer");


// =========================================
// LOAD QUESTIONS FROM questions.json
// =========================================
fetch("question.json")
.then(response => {

    // Check if file loads correctly
    if (!response.ok) {
        throw new Error("❌ Cannot load questions.json. Check file path.");
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


// =========================================
// FORM SUBMISSION HANDLER
// (Currently only testing - no database yet)
// =========================================
document
.getElementById("surveyForm")
.addEventListener("submit", function(e) {

    // Prevent page reload
    e.preventDefault();

    // TEMP: Collect all input values
    const formData = {};

    document.querySelectorAll("#questionsContainer input").forEach(input => {
        formData[input.id] = input.value;
    });

    // Show collected data in console
    console.log("📩 Form Submitted:", formData);

    // Temporary confirmation
    alert("Form submitted successfully! Check console for data.");
});