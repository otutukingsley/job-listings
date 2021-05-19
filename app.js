const jobListings = [
  {
    id: 1,
    company: 'Photosnap',
    logo: './img/photosnap.svg',
    new: true,
    featured: true,
    position: 'Senior Frontend Developer',
    role: 'Frontend',
    level: 'Senior',
    postedAt: '1d ago',
    contract: 'Full Time',
    location: 'USA Only',
    languages: ['HTML', 'CSS', 'JavaScript'],
    tools: [],
  },
  {
    id: 2,
    company: 'Manage',
    logo: './img/manage.svg',
    new: true,
    featured: true,
    position: 'Fullstack Developer',
    role: 'Fullstack',
    level: 'Midweight',
    postedAt: '1d ago',
    contract: 'Part Time',
    location: 'Remote',
    languages: ['Python'],
    tools: ['React'],
  },
  {
    id: 3,
    company: 'Account',
    logo: './img/account.svg',
    new: true,
    featured: false,
    position: 'Junior Frontend Developer',
    role: 'Frontend',
    level: 'Junior',
    postedAt: '2d ago',
    contract: 'Part Time',
    location: 'USA Only',
    languages: ['JavaScript'],
    tools: ['React', 'Sass'],
  },
  {
    id: 4,
    company: 'MyHome',
    logo: './img/myhome.svg',
    new: false,
    featured: false,
    position: 'Junior Frontend Developer',
    role: 'Frontend',
    level: 'Junior',
    postedAt: '5d ago',
    contract: 'Contract',
    location: 'USA Only',
    languages: ['CSS', 'JavaScript'],
    tools: [],
  },
  {
    id: 5,
    company: 'Loop Studios',
    logo: './img/loop-studios.svg',
    new: false,
    featured: false,
    position: 'Software Engineer',
    role: 'Fullstack',
    level: 'Midweight',
    postedAt: '1w ago',
    contract: 'Full Time',
    location: 'Worldwide',
    languages: ['JavaScript'],
    tools: ['Ruby', 'Sass'],
  },
  {
    id: 6,
    company: 'FaceIt',
    logo: './img/faceit.svg',
    new: false,
    featured: false,
    position: 'Junior Backend Developer',
    role: 'Backend',
    level: 'Junior',
    postedAt: '2w ago',
    contract: 'Full Time',
    location: 'UK Only',
    languages: ['Ruby'],
    tools: ['RoR'],
  },
  {
    id: 7,
    company: 'Shortly',
    logo: './img/shortly.svg',
    new: false,
    featured: false,
    position: 'Junior Developer',
    role: 'Frontend',
    level: 'Junior',
    postedAt: '2w ago',
    contract: 'Full Time',
    location: 'Worldwide',
    languages: ['HTML', 'JavaScript'],
    tools: ['Sass'],
  },
  {
    id: 8,
    company: 'Insure',
    logo: './img/insure.svg',
    new: false,
    featured: false,
    position: 'Junior Frontend Developer',
    role: 'Frontend',
    level: 'Junior',
    postedAt: '2w ago',
    contract: 'Full Time',
    location: 'USA Only',
    languages: ['JavaScript'],
    tools: ['Vue', 'Sass'],
  },
  {
    id: 9,
    company: 'Eyecam Co.',
    logo: './img/eyecam-co.svg',
    new: false,
    featured: false,
    position: 'Full Stack Engineer',
    role: 'Fullstack',
    level: 'Midweight',
    postedAt: '3w ago',
    contract: 'Full Time',
    location: 'Worldwide',
    languages: ['JavaScript', 'Python'],
    tools: ['Django'],
  },
  {
    id: 10,
    company: 'The Air Filter Company',
    logo: './img/the-air-filter-company.svg',
    new: false,
    featured: false,
    position: 'Front-end Dev',
    role: 'Frontend',
    level: 'Junior',
    postedAt: '1mo ago',
    contract: 'Part Time',
    location: 'Worldwide',
    languages: ['JavaScript'],
    tools: ['React', 'Sass'],
  },
];

const clearBtn = document.querySelector('.clear-search-container');

//Load all event listeners
loadEvents();

//Load event function
function loadEvents() {
  document.addEventListener('DOMContentLoaded', setJobs);
  window.addEventListener('click', tagFilter);
  clearBtn.addEventListener('click', clearSearchBar);
  window.addEventListener('touchstart', tagFilter);
  clearBtn.addEventListener('touchstart', clearSearchBar);
}

//This Function Returns the Tags on the Web Page
function getHtmlTag(tag, tagClass) {
  return `<div class="${tagClass}">${tag}</div>`;
}

/*This Function Returns each job item dynamically into the page.
the filterTags parameter which is an empty array is an array that contains 
the content of the search bar and compares the values in the searchBar 
and the tag values we have in our Joblisting array and displays only the objects that have same content in the filterTags and in the jobListing arrays there by filtering them */

function getJoblistings(jobDataObj, filterTags = []) {
  const jobTagsPlaceHolder = '###JOB_TAGS###';
  let eachJobCard = `        
    <div class="jobs-list-item">
        <div class="jobs-grid-1 jobs-left-grid">
          <img
            src="${jobDataObj.logo}"
            alt="${jobDataObj.company}"
            class="jobs-list-img"
            />
          <div class="jobs-info">
            <span class="company">${jobDataObj.company}</span>
            <span class="jobs-title">${jobDataObj.position}</span>
            <ul class="jobs-details">
                <li class="jobs-details-item">${jobDataObj.postedAt}</li>
                <li class="jobs-details-item">${jobDataObj.contract}</li>
                <li class="jobs-details-item">${jobDataObj.location}</li>
            </ul>
          </div>
        </div>
            <div class="hr"></div>
        <div class="jobs-grid-2 jobs-right-grid">
            ${jobTagsPlaceHolder}
        </div>
    </div>
  `;

  const tagsArr = [
    jobDataObj.role,
    jobDataObj.level,
    ...jobDataObj.languages,
    ...jobDataObj.tools,
  ];

  const filterPassed =
    !filterTags.length ||
    filterTags.every((tag) => {
      return tagsArr.includes(tag);
    });

  if (!filterPassed) {
    return '';
  }

  const tagStr = tagsArr.reduce((accumulator, currentTag) => {
    return accumulator + getHtmlTag(currentTag, 'tag');
  }, '');

  return eachJobCard.replace(jobTagsPlaceHolder, tagStr);
}

//This Function Displays the content dynamically
function setJobs(filterTags) {
  const jobListingHTML = jobListings.reduce(
    (accumulator, currentJobObj) => {
      return accumulator + getJoblistings(currentJobObj, filterTags);
    },
    ''
  );

  document.getElementById('jobs-list').innerHTML = jobListingHTML;
}

function toggleActiveClass(elem, elemClassName) {
  if (elem.classList.contains(elemClassName)) {
    elem.classList.remove(elemClassName);
    return;
  }
  elem.classList.add(elemClassName);
}

function displaySearchBar(display = false) {
  const searchBar = document.getElementById('search-container');
  if (display) {
    searchBar.classList.remove('search-container-hidden');
    return;
  }
  searchBar.classList.add('search-container-hidden');
}
/* getSearchBarTags functions loops through the search bar children,
it gets the children's innerhtml as an array using the map method
and checks for any falsey value using the filter method which will
know only return the actual tags. We then run a conditional on the 
array of tags in the search bar. if the Search bar array includes the tagValue
parameter, we remove it from the array using the filter method if not we add it
to the. Ultimately, the function returns an array of searchBar children after 
all our conditions have been met.*/

function getSearchBarTags(tagValue, searchContentEl) {
  let existingTagsInSearchBar = Array.from(searchContentEl.children)
    .map((eachTag) => eachTag.innerHTML && eachTag.innerHTML.trim())
    .filter((tag) => !!tag);

  if (existingTagsInSearchBar.includes(tagValue)) {
    existingTagsInSearchBar = existingTagsInSearchBar.filter(
      (tag) => tag !== tagValue
    );
  } else {
    existingTagsInSearchBar = [...existingTagsInSearchBar, tagValue];
  }
  return existingTagsInSearchBar;
}

/*Setting a event listener to listen to a click
so that when we click the tags on the cards it will 
display in the search content card and also filter 
the whole job listings*/

function tagFilter(event) {
  const targetEl = event.target;
  const tagValue = targetEl.innerHTML.trim();
  const tagClasses = ['tag', 'close-tag'];

  /* this function will only run when we
  loop through the tagClasses array using the some method that returns true or false
  if the conditions specified in the call back is met. in our case if it is false, we return nothing, hence we run the rest of the program*/

  if (
    !tagClasses.some((className) =>
      targetEl.classList.contains(className)
    )
  ) {
    return;
  }

  //Get the search bar content
  const searchContentEl = document.getElementById('search-content');

  //Get the array of tags in the searchBar content
  const tagsInSearchContent = getSearchBarTags(
    tagValue,
    searchContentEl
  );

  searchContentEl.innerHTML = tagsInSearchContent.reduce(
    (acc, currentTag) => {
      return acc + getHtmlTag(currentTag, 'close-tag');
    },
    ''
  );

  displaySearchBar(tagsInSearchContent.length > 0);
  toggleActiveClass(targetEl, 'active-tag');
  setJobs(tagsInSearchContent);
}

function clearSearchBar(event) {
  //Get the search bar content
  const searchContentEl = document.getElementById('search-content');
  const tagsInSearchContent = Array.from(searchContentEl).filter(
    (tag) => !tag
  );

  if (event.target.classList.contains('clear-search-container')) {
    searchContentEl.innerHTML = tagsInSearchContent.reduce(
      (acc, currentTag) => {
        return acc + getHtmlTag(currentTag, 'close-tag');
      },
      ''
    );
    event.target.parentElement.classList.add(
      'search-container-hidden'
    );
    setJobs(tagsInSearchContent);
  }
}
