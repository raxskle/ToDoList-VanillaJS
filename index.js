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

// 初始化
let localList = [];
let finishAllFlag = false;

let ShowALL = function () {
  //检查是否storage存有list
  let finishAllFlag = false;
  finishAll.style.color = "rgb(163, 163, 163)";
  if (localStorage.todolist) {
    // 读取
    localList = JSON.parse(localStorage.todolist);
    let finishAllFlag3 = true;

    for (let i = 0; i < localList.length; i++){
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
      p.innerHTML = localList[i].text;
      let rawHTML = localList[i].text;   
      // 设置checkbox状态
      if (localList[i].checked == "true") {
        checkbox.checked = "true";
        p.innerHTML = "<del>" + rawHTML + "</del>";
        p.style.color = "rgb(163, 163, 163)";    
      }
      else if (localList[i].checked == "false") {
        checkbox.checked = null;
        p.innerHTML = rawHTML;
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
          p.innerHTML = "<del>" + rawHTML + "</del>";
          p.style.color = "rgb(163, 163, 163)";    
          localList[index].checked = "true";   
          localStorage.todolist = JSON.stringify(localList);
        }
        else {
          p.innerHTML = rawHTML;
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

    }  
    if (finishAllFlag3 == true) {
      finishAllFlag = true;
      const finishAll = document.querySelector('.finishall');
      finishAll.style.color = 'black';
    }

    destroyButtonAppear();
  }  
}

ShowALL();


//#region
let ShowActive = function () {
  let finishAllFlag = false;
  finishAll.style.color = "rgb(163, 163, 163)";
  //检查是否storage存有list
  if (localStorage.todolist) {
    // 读取
    localList = JSON.parse(localStorage.todolist);

    let finishAllFlag3 = true;

    for (let i = 0; i < localList.length; i++){
      if (localList[i].checked == "false") {
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
        p.innerHTML = localList[i].text;
        let rawHTML = localList[i].text;   
        // 设置checkbox状态
        if (localList[i].checked == "true") {
          checkbox.checked = "true";
          p.innerHTML = "<del>" + rawHTML + "</del>";
          p.style.color = "rgb(163, 163, 163)";    
        }
        else if (localList[i].checked == "false") {
          checkbox.checked = null;
          p.innerHTML = rawHTML;
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
            p.innerHTML = "<del>" + rawHTML + "</del>";
            p.style.color = "rgb(163, 163, 163)";    
            localList[index].checked = "true";   
            localStorage.todolist = JSON.stringify(localList);
          }
          else {
            p.innerHTML = rawHTML;
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
          
      }

    }  

    if (finishAllFlag3 == true) {
      finishAllFlag = true;
      const finishAll = document.querySelector('.finishall');
      finishAll.style.color = 'black';
    }

    destroyButtonAppear();
  }  
}

//#endregion

//#region
let ShowCompleted = function () {
  let finishAllFlag = false;
  finishAll.style.color = "rgb(163, 163, 163)";
  //检查是否storage存有list
  if (localStorage.todolist) {
    // 读取
    localList = JSON.parse(localStorage.todolist);

    let finishAllFlag3 = true;

    for (let i = 0; i < localList.length; i++){
      if (localList[i].checked == "true") {
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
        p.innerHTML = localList[i].text;
        let rawHTML = localList[i].text;   
        // 设置checkbox状态
        if (localList[i].checked == "true") {
          checkbox.checked = "true";
          p.innerHTML = "<del>" + rawHTML + "</del>";
          p.style.color = "rgb(163, 163, 163)";    
        }
        else if (localList[i].checked == "false") {
          checkbox.checked = null;
          p.innerHTML = rawHTML;
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
            p.innerHTML = "<del>" + rawHTML + "</del>";
            p.style.color = "rgb(163, 163, 163)";    
            localList[index].checked = "true";   
            localStorage.todolist = JSON.stringify(localList);
          }
          else {
            p.innerHTML = rawHTML;
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
          
      }

    }  

    if (finishAllFlag3 == true) {
      finishAllFlag = true;
      const finishAll = document.querySelector('.finishall');
      finishAll.style.color = 'black';
    }

    destroyButtonAppear();
  }  
}

//#endregion


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

    // 得到已显示的列表
    let itemCount = document.querySelectorAll('.item');
    let count = itemCount.length;
    
    // 读取
    localList = JSON.parse(localStorage.todolist);

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
    p.innerHTML = localList[count].text;

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




    let rawHTML = p.innerHTML;    
    checkbox.addEventListener('change', () => {
      // 找到这是第几个checkbox，改storage的状态
      let index = 0;
      const indexCheckbox = document.querySelectorAll('.checkbox');
      while (indexCheckbox[index] != checkbox) {
        index++;
      }


      // 修改p的样式
      if (checkbox.checked) {
        p.innerHTML = "<del>" + rawHTML + "</del>";
        p.style.color = "rgb(163, 163, 163)";    
        localList[index].checked = "true";   
        localStorage.todolist = JSON.stringify(localList);
      }
      else {
        p.innerHTML = rawHTML;
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
        p[i].innerHTML = "<del>" + p[i].innerHTML + "</del>";
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
        p[i].innerHTML = p[i].innerHTML.slice(5,-6);
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

  if (count == 1) {
    n.innerHTML = count + " item left";
  }
  else {
    n.innerHTML = count + " items left";
  }
}
showLeft();

container.addEventListener('click', () => {
  setTimeout(() => {
    showLeft();
  },40)
  
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
  ShowALL();
})

active.addEventListener('click', () => {
  const childs = items.children;
  for (let i = 0; i < childs.length; i++){
    items.removeChild(childs[i]);   
    i--;//重要！因为减了节点 后面的index就减一
  }
  ShowActive();
})

completed.addEventListener('click', () => {
  const childs = items.children;
  for (let i = 0; i < childs.length; i++){
    items.removeChild(childs[i]);   
    i--;//重要！因为减了节点 后面的index就减一
  }
  ShowCompleted();
})

