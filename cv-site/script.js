const cvData = {
    contact: {
      phone: "+123-456-7890",
      email: "hello@reallygreatsite.com",
      address: "123 Anywhere St... Any City",
      website: "www.reallygreatsite.com"
    },
    education: [
      { year: "2029-2030", university: "WARDIERE UNIVERSITY", degree: "Master of Business Management" },
      { year: "2025-2029", university: "WARDIERE UNIVERSITY", degree: "Bachelor of Business", gpa: "GPA: 3.8/4.0" }
    ],
    skills: [
      "Project Management", "Public Relations", "Teamwork", 
      "Time Management", "Leadership", "Effective Communication", "Critical Thinking"
    ],
    languages: [
      "English (fluent)", "French (fluent)", "German (basics)", "Spanish (intermediate)"
    ],
    experience: [
      {
        company: "Borcelle Studio",
        role: "Marketing Manager & Specialist",
        tasks: ["Task A", "Task B", "Task C"]
      }
    ]
  };
  window.onload = function () {
    loadContact();
    loadEducation();
    loadSkills();
    loadLanguages();
    loadExperience();
  };
  function loadContact() {
    const c = cvData.contact;
    document.getElementById("contactInfo").innerHTML = `
      <p><i class="fa fa-phone Icon"></i> ${c.phone}</p>
      <p><i class="fa fa-envelope Icon"></i> ${c.email}</p>
      <p><i class="fa fa-map-marker Icon"></i> ${c.address}</p>
      <p><i class="fa-solid fa-globe Icon"></i> ${c.website}</p>
    `;
  }
  function loadEducation() {
    const container = document.getElementById("educationList");
    container.innerHTML = "";
    cvData.education.forEach(edu => {
      container.innerHTML += `
        <p>
          <b>${edu.year}<br/>${edu.university}</b>
          <ul>
            <li>${edu.degree}</li>
            ${edu.gpa ? `<li>${edu.gpa}</li>` : ""}
          </ul>
        </p>
      `;
    });
  }
  function loadSkills() {
    const container = document.getElementById("skillsList");
    container.innerHTML = "";
    cvData.skills.forEach(skill => {
      container.innerHTML += `<li>${skill}</li>`;
    });
  }
  function loadLanguages() {
    const container = document.getElementById("languagesList");
    container.innerHTML = "";
    cvData.languages.forEach(lang => {
      container.innerHTML += `<li>${lang}</li>`;
    });
  }
  function loadExperience() {
    const container = document.querySelector(".workExperience");
    let html = `<h2>WORK EXPERIENCE<hr></h2>`;
    cvData.experience.forEach(exp => {
      html += `<p><b>${exp.company}</b><br>${exp.role}</p><ul>`;
      exp.tasks.forEach(task => {
        html += `<li>${task}</li>`;
      });
      html += `</ul>`;
    });
    container.innerHTML = html;
  }
  function addEducation() {
    const year = prompt("İlləri daxil edin:");
    const uni = prompt("Universitetin adını daxil edin:");
    const degree = prompt("Dərəcə və ya ixtisas:");
    const gpa = prompt("Orta bal (əgər varsa):");
    if (year && uni && degree) {
      cvData.education.push({ year, university: uni, degree, gpa: gpa || undefined });
      loadEducation();
    }
  }
  function addSkill() {
    const newSkill = prompt("Yeni bacarıq daxil et:");
    if (newSkill) {
      cvData.skills.push(newSkill);
      loadSkills();
    }
  }
  function addWorkExperience() {
    const company = prompt("Şirkət:");
    const role = prompt("Vəzifə:");
    const task1 = prompt("Tapşırıq 1:");
    const task2 = prompt("Tapşırıq 2:");
    const task3 = prompt("Tapşırıq 3:");
    if (company && role) {
      cvData.experience.push({ company, role, tasks: [task1, task2, task3].filter(Boolean) });
      loadExperience();
    }
  }
  window.onload = function () {
    loadContact();
    loadEducation();
    loadSkills();
    loadLanguages();
    loadExperience();
    loadForm(); 
  };
  function validateFormFields() {
    let valid = true;
  
    const name = document.getElementById("inputName").value.trim();
    const email = document.getElementById("inputEmail").value.trim();
    const date = document.getElementById("inputDate").value;
    const desc = document.getElementById("inputDesc").value.trim();
  
    document.getElementById("errorName").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorDate").textContent = "";
    document.getElementById("errorDesc").textContent = "";
    if (name.length < 3) {
      document.getElementById("errorName").textContent = "Ad ən az 3 simvol olmalıdır.";
      valid = false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("errorEmail").textContent = "Düzgün email daxil edin.";
      valid = false;
    }
    if (!date) {
      document.getElementById("errorDate").textContent = "Tarix seçin.";
      valid = false;
    }
    if (desc.length < 10) {
      document.getElementById("errorDesc").textContent = "Təsvir ən az 10 simvol olmalıdır.";
      valid = false;
    }
    return valid;
  }
  function saveForm() {
    if (!validateFormFields()) return;
    const formData = {
      name: document.getElementById("inputName").value,
      email: document.getElementById("inputEmail").value,
      date: document.getElementById("inputDate").value,
      description: document.getElementById("inputDesc").value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    alert("Form məlumatları yadda saxlanıldı.");
  }
  function loadForm() {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      document.getElementById("inputName").value = savedData.name || "";
      document.getElementById("inputEmail").value = savedData.email || "";
      document.getElementById("inputDate").value = savedData.date || "";
      document.getElementById("inputDesc").value = savedData.description || "";
    }
  }
  let editMode = false;

function toggleEditMode() {
  editMode = !editMode;
  if (editMode) {
    renderEditable();
  } else {
    renderViewMode();
  }
}
function renderEditable() {
    const contact = cvData.contact;
    document.getElementById("contactInfo").innerHTML = `
      <label>Telefon: <input type="text" id="editPhone" value="${contact.phone}"></label><br>
      <label>Email: <input type="text" id="editEmail" value="${contact.email}"></label><br>
      <label>Ünvan: <input type="text" id="editAddress" value="${contact.address}"></label><br>
      <label>Website: <input type="text" id="editWebsite" value="${contact.website}"></label><br>
      <button onclick="saveEdits()">Yadda saxla</button>
    `;
  }
  function saveEdits() {
    cvData.contact.phone = document.getElementById("editPhone").value;
    cvData.contact.email = document.getElementById("editEmail").value;
    cvData.contact.address = document.getElementById("editAddress").value;
    cvData.contact.website = document.getElementById("editWebsite").value;
  
    localStorage.setItem("cvData", JSON.stringify(cvData));
    renderViewMode();
  }
  function renderViewMode() {
    loadContact();
    loadEducation();
    loadSkills();
    loadLanguages();
    loadExperience();
  }
  function resetAll() {
    localStorage.removeItem("cvData");
    location.reload();
  }
  function loadSavedCV() {
    const saved = localStorage.getItem("cvData");
    if (saved) {
      Object.assign(cvData, JSON.parse(saved));
    }
  }
  window.onload = function () {
    loadSavedCV();
    loadContact();
    loadEducation();
    loadSkills();
    loadLanguages();
    loadExperience();
    loadForm();
  };
            
  
    