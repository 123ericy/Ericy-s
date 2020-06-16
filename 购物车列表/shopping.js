const table = document.getElementById('cartTable');
const tr = table.children[1].rows;
// children:子节点0开始计，.rows是表格元素特有的属性存放节点所有的tr元素。

const checkAllInputs = document.getElementsByClassName('check-all'); // 全选框
const checkInputs = document.getElementsByClassName('check'); // 所有选择框(单和全)

const selectedTotal = document.getElementById('selectedTotal');
const priceTotal = document.getElementById('priceTotal');

const up = document.getElementsByClassName('footer-3')[0];
const up_up = document.getElementsByClassName('up')[0];
const foot = document.getElementById('foot');

const delet = document.getElementsByClassName('delete');


// 计算
let getTotal = () => {
    let selected = 0;
    let price = 0; // 初始价格和选择个数
    let htmlStr = '';
    for (let i = 0; i < tr.length; i++) {
        if (tr[i].getElementsByTagName('input')[0].checked) {
            tr[i].className = 'content';
            selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
            price += parseFloat(tr[i].cells[4].innerHTML);
            // .cells也是特殊的表格属性,存放这个表格每一行下面的所有单元格(也就是td元素) 
            htmlStr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span className="del" index="' + i + '">取消选择</span></div>';
        } else {
            tr[i].className = '';
        }
    }
    selectedTotal.innerHTML = selected;
    priceTotal.innerHTML = price.toFixed(2); // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
    foot.innerHTML = htmlStr;

    if (selected == 0) {
        foot.style.display = 'none';
    }
    // 这里的判断条件和下方的(this.checked == false)不同,当前不选和全不选的区别  
}

// 选择按钮的触发的事件
for (let i = 0; i < checkInputs.length; i++) {
    checkInputs[i].onclick = function () {

        if (this.className === "check-all check") {
            for (let j = 0; j < checkInputs.length; j++) {
                checkInputs[j].checked = this.checked;
            }
        }
        if (this.checked == false) {
            for (var z = 0; z < checkAllInputs.length; z++) {
                checkAllInputs[z].checked = false;
            }
        }
        // 两个this都是指外层的checkInputs

        getTotal();
    }
}

up.onclick = function () {
    up_up.innerHTML = up_up.innerHTML == '︾' ? '︽' : '︾';
    foot.style.display = foot.style.display == 'block' ? 'none' : 'block';
}

for (let i = 0; i < delet.length; i++) {
    delet[i].onmouseover = function () {
        this.className = "delete active";
    }
    delet[i].onmouseout = function () {
        this.className = "delete";
    }
}

// 已选商品的取消功能功能的实现(运用到事件代理(e参数)这个概念,代理到父元素上)
// 因为已选商品的浮层一开始是没有东西的,是动态生成的(有前置条件),不是已有的元素给他绑定事件是没有用的 
foot.onclick = function (e) {
    let el = e.srcElement;
    if (el.className == 'del') {
        const index = document.getAttribute('index');
        const input = tr[index].getElementsByTagName('inputs')[0];
        input.checked == false; 
    }

}