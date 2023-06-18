const loadTools = async () => {
  // start loading spinner
  toggleSpinner(true);

  // fetch data
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();

  // show show_more button
  const showAll = document.getElementById('show-all');
  showAll.classList.remove('d-none');

  // display function call
  displayTools(data.data.tools.slice(0, 6));
}

const displayTools = (tools) => {
  const toolsContainer = document.getElementById('tool-container');
  toolsContainer.innerHTML = '';

  // display
  display(tools, toolsContainer);

  // sort data
  const sorting = (a, b) => {
    const dataA = new Date(a.published_in)
    const dataB = new Date(b.published_in)
    if (dataA > dataB) {
      return 1;
    }
    else if (dataB > dataA) {
      return -1;
    }
    else {
      return 0;
    }
  };

  // call sort data button
  document.getElementById('sort_data').addEventListener('click', function () {
    // start spinner loading
    toggleSpinner(true);

    // call sort function
    tools.sort(sorting);

    // clear container data
    toolsContainer.innerHTML = '';

    // call display function
    display(tools, toolsContainer);

    // console.log(tools.sort(sorting));
  })
}

// display function
const display = (tools, toolsContainer) => {
  tools.forEach(tool => {
    // console.log(tool)
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col');
    toolDiv.innerHTML = `
  <div class="card h-100 p-4">
  <img src="${tool.image}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">Features</h5>
  <ol id="with-join">
    ${tool.features?.length ? tool.features.map((name) => `<li>${name}</li>`).join('') : ''}
 </ol>
  </div>
  <div class="card-footer">
  <div>
  <h5 class="card-title">${tool.name}</h5>
  <i class="fa fa-calendar"></i>
  <small class="text-muted"> ${tool.published_in}</small>
  </div>
  <div class="d-flex justify-content-end">
  <i onclick="loadToolDetails('${tool.id}')" class="fa-solid fa-arrow-right bg-danger bg-opacity-25  rounded-circle p-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
  </div>
  </div>
</div>
`;

    toolsContainer.appendChild(toolDiv);
  });
  // stop loading
  toggleSpinner(false);
}

// spinner function
const toggleSpinner = isLoading => {
  const loader = document.getElementById('loader');
  if (isLoading) {
    loader.classList.remove('d-none')
  }
  else {
    loader.classList.add('d-none')
  }
}

// details data show on modal
const loadToolDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayToolDetails(data.data);
}

const displayToolDetails = tool => {
  console.log(tool);
  //console.log("jamela hoise");
  if (tool.id == "12") {
    console.log("jamela hoise");
    tool.accuracy.score = 0;
    tool.pricing = new Array();
    tool.pricing.push({price: 0});
    tool.pricing.push({price: 0});
    tool.pricing.push({price: 0});
  }
  const modalPart01 = document.getElementById('modalPart01');
  modalPart01.innerHTML =
    `<p class="p-1">${tool.description}</p>
  <div class="container text-center d-flex">
   <div class="row gap-2">
    <div class="col bg-body-tertiary rounded-1">
    <p>${tool.pricing[0].price != '0' && tool.pricing[0].price != 'No cost' ? tool.pricing[0].price : 'Free of Cost/'}</p>
    <h6>${tool.pricing[0].plan}</h6>
    </div>
    <div class="col bg-body-tertiary rounded-1">
    <h6>${tool.pricing[1].price != '0' && tool.pricing[1].price != 'No cost' ? tool.pricing[1].price : 'Free of Cost/'}</h6>
    <h6> ${tool.pricing[1].plan}</h6>
    </div>
    <div class="col bg-body-tertiary rounded-1">
    <h6>${tool.pricing[2].price != '0' && tool.pricing[2].price != 'No cost' ? tool.pricing[2].price : 'Free of Cost/'}</h6>
    <h6> ${tool.pricing[2].plan}</h6>
     </div>
   </div>
  </div>
  
  <div class="container pt-3">
        <div class="row">
          <div class="col">
             <h6>Features</h6>
            <ul>
              <li>${tool.features[1].feature_name ? tool.features[1].feature_name : 'no data'}</li>
              <li>${tool.features[2].feature_name ? tool.features[2].feature_name : ''}</li>
              <li>${tool.features[3].feature_name ? tool.features[3].feature_name : ''}</li>
            </ul>
          </div>
          <div class="col">
             <h6>Integrations</h6>
            <ul>
            ${tool.integrations?.length ? tool.integrations.map((name) => `<li>${name}</li>`).join('') : 'No Data Found'}
            </ul>
          </div>
        </div>
      </div>
      `
  const modalPart02 = document.getElementById('modalPart02');
  if (tool.accuracy.score * 100 > 0) callButton(tool);
  else {
    callButton2(tool);
  }
}

const callButton =(tool)=> {

  modalPart02.innerHTML = `
  <div class="p-2 position-relative ">
  <img class="w-100 rounded-4 img-fluid " src="${tool.image_link[0]}" alt="...">
  <button id="button" class="btn bg-danger rounded-4 text-white position-absolute top-70 end-0">${tool.accuracy.score ? tool.accuracy.score * 100 + ' % accuracy' : ""}</button>
  </div>
  <div class="text-center mt-4">
  <h5>${tool.input_output_examples != null ? tool.input_output_examples[0].input : 'Can you give any example?'}</h5>
  <p>${tool.input_output_examples != null ? tool.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
  </div>
`;
}

const callButton2 =(tool)=> {
  modalPart02.innerHTML = `
  <div class="p-2 position-relative ">
  <img class="w-100 rounded-4 img-fluid " src="${tool.image_link[0]}" alt="...">
  </div>
  <div class="text-center mt-4">
  <h5>${tool.input_output_examples != null ? tool.input_output_examples[0].input : 'Can you give any example?'}</h5>
  <p>${tool.input_output_examples != null ? tool.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
  </div>
`;
}
// show more button click
const show_more = async () => {
  // start loading
  toggleSpinner(true);

  // fetch data
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();

  // hide show_more function
  const showAll = document.getElementById('show-all');
  showAll.classList.add('d-none');

  displayTools(data.data.tools);
}


loadTools();





