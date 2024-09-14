// DOM elements
const jobForm = document.querySelector("#jobSearchForm");
// implimentation variables
let defaultPageData;
// cv api
const baseUrl1 = "https://api.apyhub.com/sharpapi/api/v1/hr/parse_resume";
// funtions
async function getData1() {
  try {
    const response = await fetch(baseUrl1, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "multipart/form",
        "apy-token":
          "APY0BjgAb7teIwxwoCdCfp3NGz8jwibINV0Gimmr7yqnvkGyz7AGXht0tqlw4ZarlJC5js6gOc9B",
      },
      body: {
        file: "./images/png2pdf.pdf",
      },
    });
    const data = await response.json();
  } catch (err) {
    console.error(err);
  }
}
// -job API get data function
async function getData2(job, country) {
  try {
    const baseUrl2 = `http://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=f3b92f44&app_key=d3dd5c85f869c773c96ba791890237a3&results_per_page=20&what=${job}&content-type=application/json`;
    const response = await fetch(baseUrl2, {
      method: "GET",
      mode: "cors",
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
// creat postings
function crearElement(elementType, wherToAppend, classes) {
  const element = document.createElement(elementType);
  wherToAppend.append(element);
  element.classList.add(classes);
  return element;
}
function creatPostings() {
  for (let i = 0; i < 20; i++) {
    const posting = crearElement(
      "article",
      document.querySelector(".job-postings"),
      "posting"
    );
    const headerContainer = crearElement("div", posting, "header-container");
    const logoContainer = crearElement("div", posting, "logo-container");
    const logo = crearElement("i", logoContainer, "fa-solid");
    logo.classList.add("fa-building-user");
    const headerContainerContent = crearElement(
      "div",
      headerContainer,
      "header-container-content"
    );
    const postingHeader = crearElement(
      "div",
      headerContainerContent,
      "posting-header"
    );
    const companyNameLocation = crearElement(
      "div",
      postingHeader,
      "company-name-location"
    );
    const companyName = crearElement(
      "span",
      companyNameLocation,
      "company-name"
    );
    const arrow = crearElement("i", companyNameLocation, "fa-solid");
    arrow.classList.add("fa-arrow-right");
    const location = crearElement("span", companyNameLocation, "location");
    const postingTime = crearElement("span", postingHeader, "posting-time");
    const postingTitle = crearElement(
      "span",
      headerContainerContent,
      "posting-title"
    );
    const postingBody = crearElement("div", posting, "posting-body");
    const postingDescription = crearElement("p", postingBody, "description");
    const postingFooter = crearElement("div", posting, "posting-footer");
    const salary = crearElement("div", postingFooter, "salary");
    const salaryMin = crearElement("span", salary, "slary-min");
    const salaryMax = crearElement("span", salary, "slary-max");
    const fullTime = crearElement("span", postingFooter, "full-time");
    insertPostingData(
      companyName,
      location,
      postingTime,
      postingDescription,
      postingTitle,
      salaryMin,
      salaryMax,
      fullTime,
      i
    );
  }
}
// insert posting data
function insertPostingData(
  companyName,
  location,
  postingTime,
  postingDescription,
  postingTitle,
  salaryMin,
  salaryMax,
  fullTime,
  i
) {
  if (defaultPageData.results[i].company.display_name !== undefined) {
    companyName.innerText = defaultPageData.results[i].company.display_name;
  } else {
    companyName.innerText = "no name";
  }
  location.innerText = defaultPageData.results[i].location.display_name;
  postingTime.innerText = defaultPageData.results[i].created;
  postingDescription.innerText = defaultPageData.results[i].description;
  postingTitle.innerText = defaultPageData.results[i].title;
  salaryMin.innerText = `${defaultPageData.results[i].salary_min}~`;
  salaryMax.innerText = `${defaultPageData.results[i].salary_max}/yr`;
  if (
    defaultPageData.results[i].contract_type == "permanent" ||
    defaultPageData.results[i].contract_time == "full_time"
  ) {
    fullTime.innerText = "full time";
  } else if (defaultPageData.results[i].contract_type == "contract") {
    fullTime.innerText = "contract";
  } else {
    fullTime.innerText = "";
  }
  redirect(i);
}
// -delete postings
function deletePostings() {
  document.querySelectorAll(".posting").forEach((posting) => posting.remove());
}
// -rederecting users to the company websites
function redirect(i) {
  document.querySelectorAll(".posting").forEach((posting) => {
    posting.addEventListener("click", function () {
      window.open(defaultPageData.results[i].redirect_url);
    });
  });
}
//   implimentation

// - submit event
jobForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  deletePostings();
  const job = document.querySelector('[name="job"]').value;
  const country = document.querySelector("[name='country']").value;
  console.log(job, country);
  defaultPageData = await getData2(job, country);
  if (defaultPageData.results.length === 0) {
    deletePostings();
    document.querySelector(".err-box").innerText = "key word unfound";
    setTimeout(() => (document.querySelector(".err-box").innerText = ""), 1000);
  } else {
    creatPostings();
  }
});

// getData1();
