const items = document.querySelector('.items');
const text = document.querySelector('.text');
const save = document.querySelector('.save');
const finishAll = document.querySelector('.finishall');

// hover显示×
let destroyButtonAppear = function () {
  const item = document.querySelectorAll('.item');
  const button = document.querySelectorAll(".destroy button");
  for (let i = 0; i < item.length; i++){
    item[i].addEventListener('mouseover', () => {
      button[i].style.display = "flex";
    })
    item[i].addEventListener('mouseout', () => {
      button[i].style.display = "none";
    })  
  }  
}
destroyButtonAppear();

// 初始化子函数
let init = function (i,finishAllFlag,finishAllFlag3) {
  // 创建一堆节点
  const item = document.createElement('li');
  item.className = 'item';
  const checkbox = document.createElement('input');
  checkbox.className = 'checkbox';
  checkbox.type = 'checkbox';
  const p = document.createElement('p');
  const destroy = document.createElement('div');
  const button = document.createElement('button');
  destroy.className = 'destroy';
  const icon = document.createElement('i');
  icon.className = 'fa fa-close';
  button.appendChild(icon);
  item.appendChild(checkbox);
  item.appendChild(p);
  item.appendChild(destroy);
  items.appendChild(item); 
  destroy.appendChild(button);   

  // 插入text
  p.innerText = localList[i].text; 
  // 设置checkbox状态
  if (localList[i].checked == "true") {
    checkbox.checked = "true";
    p.style.textDecoration="line-through";
    p.style.color = "rgb(163, 163, 163)";    
  }
  else if (localList[i].checked == "false") {
    checkbox.checked = null;
    p.style.textDecoration="none";
    p.style.color = "black";
    finishAllFlag3 = false;
  }        
  

  // 添加destroy功能，在创建条目时就要加入
  destroy.addEventListener('click', () => {
    let index = 0;
    while (items.children[index] != destroy.parentNode) {
      index++;
    }
    localList.splice(index,1);
    localStorage.todolist = JSON.stringify(localList);

    items.removeChild(destroy.parentNode);    
    let checkbox = document.querySelectorAll(".checkbox");
    let finishAllFlag4 = true;
    for (let i = 0; i < checkbox.length; i++){
      if (!checkbox[i].checked) {
        finishAllFlag4 = false;
      }
    }
    if (finishAllFlag4 == true) {
      finishAll.style.color = "black";
      finishAllFlag = true;
    }
  })

  // 添加finish功能
  // 点击触发，勾上就将p的classname改了，
  // 检查所有checkbox是否都勾上，是就finishall改true
  // 不是就finishall改false
  checkbox.addEventListener('change', () => {
    // 找到这是第几个checkbox，改storage的状态
    let index = 0;
    const indexCheckbox = document.querySelectorAll('.checkbox');
    while (indexCheckbox[index] != checkbox) {
      index++;
    }

    // 修改p的样式
    if (checkbox.checked) {
      p.style.textDecoration="line-through";
      p.style.color = "rgb(163, 163, 163)";    
      localList[i].checked = "true";   
      localStorage.todolist = JSON.stringify(localList);
    }
    else {
      p.style.textDecoration="none";
      p.style.color = "black";
      localList[i].checked = "false";     
      localStorage.todolist = JSON.stringify(localList);
    }

    // 检查是否finishall
    for (let i = 0; i < items.children.length; i++){
      let checkbox = document.querySelectorAll('.checkbox');
      let finishAllFlag2 = true;
      for (let j = 0; j < checkbox.length; j++){
        if (!checkbox[j].checked) {
          finishAllFlag = false;
          finishAllFlag2 = false;
          finishAll.style.color = "rgb(163, 163, 163)";
          break;
        }
      }
      if (finishAllFlag2 == true) {
        finishAllFlag = true;
        finishAll.style.color = "black";          
      }
    }

  })

  // double click
  const textarea = document.createElement('input');  
  textarea.type = "text";
  textarea.className = "dbchange";
  item.appendChild(textarea);
  p.addEventListener('dblclick', () => {
    if (localList[i].checked == "false") {
      textarea.value = p.innerText;  
      textarea.className = "dbchangeclick";
      textarea.focus();

      document.addEventListener('keyup', (e) => {
        if (e.key == "Enter") {
          textarea.blur();
        }
      })
      checkbox.disabled = "true";

    }
  })

  textarea.addEventListener("blur", () => {
    textarea.className = "dbchange";    
    if (textarea.value) {
    p.innerText = textarea.value;
    localList[i].text = p.innerText;
    localStorage.todolist = JSON.stringify(localList);
    }
    checkbox.disabled = null;  
  })    


  return finishAllFlag3;
    
}

// 初始化
let localList = [];
let finishAllFlag = false;
let Show = function (type) {
  //检查是否storage存有list
  let finishAllFlag = false;
  finishAll.style.color = "rgb(163, 163, 163)";
  if (localStorage.todolist) {
    // 读取
    localList = JSON.parse(localStorage.todolist);
    let finishAllFlag3 = true;

    if (type == "showall") {
      for (let i = 0; i < localList.length; i++){
        finishAllFlag3=init(i,finishAllFlag,finishAllFlag3);
      }        
    }
    else if (type == "showactive") {
      for (let i = 0; i < localList.length; i++){
        if (localList[i].checked == "false") {
          finishAllFlag3=init(i,finishAllFlag,finishAllFlag3);
        }
      }        
    }
    else if (type == "showcompleted") {
      for (let i = 0; i < localList.length; i++){
        if (localList[i].checked == "true") {
          finishAllFlag3=init(i,finishAllFlag,finishAllFlag3);
        }
      }        
    }
    console.log(finishAllFlag3);
    if (finishAllFlag3 == true) {
      finishAllFlag = true;
      const finishAll = document.querySelector('.finishall');
      finishAll.style.color = 'black';
    }
    destroyButtonAppear();
  }    
}
Show("showall");

save.addEventListener('click', () => {
  if (text.value) {
    // 加入到locallist
    console.log(localList)
    localList[localList.length] = {
      text: text.value,
      checked:"false",
    }

    finishAllFlag = false;
    finishAll.style.color = "rgb(163, 163, 163)";

    // 加到storage
    localStorage.todolist = JSON.stringify(localList);
    text.value = '';  

    // 读取
    localList = JSON.parse(localStorage.todolist);    
    let count = localList.length - 1;
    
    const completed = document.querySelector("#completed");
    if (completed.className == "onclick") {
      return ;
    }

    // 将新加的显示出来
      // 创建一堆节点
    const item = document.createElement('li');
    item.className = 'item';
    const checkbox = document.createElement('input');
    checkbox.className = 'checkbox';
    checkbox.type = 'checkbox';
    const p = document.createElement('p');
    const destroy = document.createElement('div');
    const button = document.createElement('button');
    destroy.className = 'destroy';
    const icon = document.createElement('i');
    icon.className = 'fa fa-close';
    button.appendChild(icon);
    item.appendChild(checkbox);
    item.appendChild(p);
    item.appendChild(destroy);
    items.appendChild(item); 
    destroy.appendChild(button);   

    // 插入text
    p.innerText = localList[count].text;


    // 添加destroy
    destroy.addEventListener('click', () => {
      let index = 0;  
      while (items.children[index] != destroy.parentNode) {
        index++;
      }
      localList.splice(index,1);
      localStorage.todolist = JSON.stringify(localList);

      items.removeChild(destroy.parentNode);    
      let checkbox = document.querySelectorAll(".checkbox");
      let finishAllFlag4 = true;
      for (let i = 0; i < checkbox.length; i++){
        if (!checkbox[i].checked) {
          finishAllFlag4 = false;
        }
      }
      if (finishAllFlag4 == true) {
        finishAll.style.color = "black";
        finishAllFlag = true;
      }      
    })

    let rawHTML = p.innerText;    
    checkbox.addEventListener('change', () => {
      // 找到这是第几个checkbox，改storage的状态
      let index = 0;
      const indexCheckbox = document.querySelectorAll('.checkbox');
      while (indexCheckbox[index] != checkbox) {
        index++;
      }

      // 修改p的样式
      if (checkbox.checked) {
        p.style.textDecoration="line-through";
        p.style.color = "rgb(163, 163, 163)";    
        localList[index].checked = "true";   
        localStorage.todolist = JSON.stringify(localList);
      }
      else {
        p.style.textDecoration="none";
        p.style.color = "black";
        localList[index].checked = "false";     
        localStorage.todolist = JSON.stringify(localList);
      }

      // 检查是否finishall
      for (let i = 0; i < items.children.length; i++){
        let checkbox = document.querySelectorAll('.checkbox');
        let finishAllFlag2 = true;
        for (let j = 0; j < checkbox.length; j++){
          if (!checkbox[j].checked) {
            finishAllFlag = false;
            finishAllFlag2 = false;
            finishAll.style.color = "rgb(163, 163, 163)";
            break;
          }
        }
        if (finishAllFlag2 == true) {
          finishAllFlag = true;
          finishAll.style.color = "black";          
        }
      }
    })
    destroyButtonAppear();

      // double click
    const textarea = document.createElement('input');  
    textarea.type = "text";
    textarea.className = "dbchange";
    item.appendChild(textarea);
    textarea.value = p.innerText;  
    p.addEventListener('dblclick', () => {
      if (localList[count].checked == "false") {
        textarea.className = "dbchangeclick";
        textarea.focus();

        document.addEventListener('keyup', (e) => {
          if (e.key == "Enter") {
            textarea.blur();
          }
        })
        checkbox.disabled = "true";

      }
    })

    textarea.addEventListener("blur", () => {
      textarea.className = "dbchange";    
      p.innerText = textarea.value;
      localList[count].text = p.innerText;
      localStorage.todolist = JSON.stringify(localList);
      checkbox.disabled = null;
    })
    
  }
})

// finishall
finishAll.addEventListener('click', () => {
  const checkbox = document.querySelectorAll('.item .checkbox');
  const p = document.querySelectorAll('.item p');
  if (finishAllFlag == false) {
    for (let i = 0; i < checkbox.length; i++){
      if (!checkbox[i].checked) {
        checkbox[i].checked = "true";
        p[i].style.textDecoration="line-through";
        p[i].style.color = "rgb(163, 163, 163)";     
      }
    }
    finishAll.style.color = 'black';
    finishAllFlag = true;

    for (let i = 0; i < localList.length; i++){
      localList[i].checked = "true";
    }
    localStorage.todolist = JSON.stringify(localList);

  }
  else if (finishAllFlag == true) {
    for (let i = 0; i < checkbox.length; i++){
      if (checkbox[i].checked) {
        checkbox[i].checked = null;
        p[i].style.textDecoration="none";
        p[i].style.color = "black";          
      }
    
    }
    finishAll.style.color = 'rgb(163, 163, 163)';    
    finishAllFlag = false;   
    for (let i = 0; i < localList.length; i++){
      localList[i].checked = "false";
    }    
    localStorage.todolist = JSON.stringify(localList);
  }
})


// footer left
const container = document.querySelector('.container');
const n = document.querySelector('.tail p');
let showLeft = function () {
  let count = 0;
  localList = JSON.parse(localStorage.todolist);
  for (let i = 0; i < localList.length; i++) {
    if (localList[i].checked == "false") {
      count++;
    }
  }

  if (count == 1||count==0) {
    n.innerText = count + " item left";
  }
  else {
    n.innerText = count + " items left";
  }
}
showLeft();

container.addEventListener('click', () => {
  setTimeout(() => {
    showLeft();
  },20)
  
})

// 回车Add
text.addEventListener('focus', () => {
  document.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
      save.click();
    }
  })
})

// clearfinished
const clearfinished = document.querySelector('.clearfinished');
clearfinished.addEventListener('click', () => {
  const items = document.querySelector('.items');
  const item = document.querySelectorAll('.item');
  const checkbox = document.querySelectorAll('.checkbox');
  for (let i = 0; i < localList.length; i++){
    if (localList[i].checked == "true") {
      localList.splice(i, 1);
      i--;
    }
  }
  localStorage.todolist = JSON.stringify(localList);  

  // 重新渲染
  // 检查selector哪个btn是onclick
  // 就触发一次它的click()
  const all = document.querySelector('#all');
  const active = document.querySelector('#active');
  const completed = document.querySelector('#completed');
  if (all.className == "onclick") {
    all.click();  
  }
  else if (active.className == "onclick") {
    active.click();
  }
  else if (completed.className == "onclick") {
    completed.click();
  }

})


// footerSelector
// changecolor
const selectBtn = document.querySelectorAll('.selector button');
for (let i = 0; i < selectBtn.length; i++){
  selectBtn[i].addEventListener('click', () => {
    for (let j = 0; j < selectBtn.length; j++){
      selectBtn[j].className = "nothover";
    }
    selectBtn[i].className = "onclick";
  })

  selectBtn[i].addEventListener('mouseover', () => {
    if (selectBtn[i].className != "onclick") {
      selectBtn[i].className = "onhover";
    }
  })  
  selectBtn[i].addEventListener('mouseout', () => {
    if (selectBtn[i].className != "onclick") {
      selectBtn[i].className = "nothover";      
    }
  })  

}

// selector
// 三个btn的click事件
// 不涉及改storage表
const all = document.querySelector("#all");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");
all.addEventListener('click', () => {
  const childs = items.children;
  for (let i = 0; i < childs.length; i++){
    items.removeChild(childs[i]);   
    i--;//重要！因为减了节点 后面的index就减一
  }
  Show("showall");
})

active.addEventListener('click', () => {
  const childs = items.children;
  for (let i = 0; i < childs.length; i++){
    items.removeChild(childs[i]);   
    i--;//重要！因为减了节点 后面的index就减一
  }
  Show("showactive");
})

completed.addEventListener('click', () => {
  const childs = items.children;
  for (let i = 0; i < childs.length; i++){
    items.removeChild(childs[i]);   
    i--;//重要！因为减了节点 后面的index就减一
  }
  Show("showcompleted");
})
