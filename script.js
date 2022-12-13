const inputs = document.getElementById("inputs");

var how_many_fields = 1;

var fields = new Set();
fields.add(document.getElementById("text_1"));

var entries = new Array();

var selected = document.createElement("div");

var win = document.createElement("div");

function add_new_field(contents) {
  var new_field = document.createElement("input");
  how_many_fields += 1;
  new_field.value = contents;
  var new_field_number = how_many_fields;
  new_field.type = "text";
  new_field.id = `text_${new_field_number}`;
  fields.add(new_field);
  
  var remove_button = document.createElement("button");
  remove_button.classList.add("remove_button");
  remove_button.onclick = function() {
    var text_element = document.getElementById(`text_${new_field_number}`);
    text_element.parentNode.remove();
    fields.delete(text_element);
    //how_many_fields -= 1; //commented in order to make sure there is no field overlap
    //console.log(fields);
  }
  remove_button.innerHTML = "-";
  
  var container = document.createElement("div");
  
  container.appendChild(new_field);
  container.appendChild(remove_button);
  
  inputs.appendChild(container);
  
  //console.log(fields);
}

function add_multiple_fields(content, count) {
  for (let i = 0; i < count; i++) {
    add_new_field(content);
  }
}


function update() {
  //console.log("updating");
  entries = new Array();
  document.getElementById("names").innerHTML = "";
  fields.forEach(function(text) {
    var container = document.createElement("div");
    container.classList.add("name");
    
    var name = document.createElement("span");
    name.innerHTML = text.value;
    entries.push(text.value);
    
    container.appendChild(name);
    document.getElementById("names").appendChild(container);
  });
}

function getRandomItem(items) {
    return Math.floor(Math.random() * items.length);
}

function shuffle(array) { //stolen code
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function shuffle_names() {
  names = document.getElementById("names");
  var shuffled = shuffle(Array.from(names.children));
  names.innerHTML = "";
  console.log(shuffled);
  for (const row of shuffled) {
    console.log(row);
    names.appendChild(row);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function spin_itr(i, names, select, velocity) {
  var i_obj = names.children[i];
  
  selected.classList.remove("selected");
  i_obj.classList.add("selected");
  selected = i_obj;
  
  selected.scrollIntoView({
    "behavior": "smooth",
    "block": "center"
  });
  
  //console.log(i);


  if (i === select) {
    sleep(100).then(() => {
      i_obj.classList.remove("selected");
      i_obj.classList.add("win");
      win = i_obj;
      selected = document.createElement("div");
    });
  }
  
  else {
    sleep(velocity).then(() => { spin_itr(i+=1, names, select, velocity+10); });
  }
}

function spin() {
  var names = document.getElementById("names");
  
  win.classList.remove("win");
  win = document.createElement("div");
  
  names.scroll({
    top: 0,
    behavior: "auto"
  });
  
  var select = getRandomItem(entries);
  //console.log(select);
  
  var velocity = 500 / select;
  
  spin_itr(0, names, select, velocity);
}

var show_multiple = false;
function toggle_multiple() {
  show_multiple = !show_multiple;
  
  var m_div = document.getElementById("add_multiple");
  
  if (show_multiple) {
    m_div.style.display = "unset";
  }
  else {
    m_div.style.display = "none";
  }
}

function add_multiple_fields_button() {
  add_multiple_fields(document.getElementById('multiple_text').value, parseInt(document.getElementById('multiple_amount').value, 10))
}
