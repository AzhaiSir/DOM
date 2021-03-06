window.dom = {
    create(string){
        const container = document.createElement("template")
        //trim 去除两边空格
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    // 用与新增弟弟
    after(node, node2){
        //找到这个节点的爸爸,调用爸爸的insertBefore方法，然后将node2插入到下一个节点的前面
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    // 用与新增哥哥
    before(node, node2){
        node.parentNode.insertBefore(node2, node)
    },
    // 新增儿子
    append(parent, node){
        parent.appendChild(node)
    },
    // 新增爸爸
    wrap(node,parent){
        dom.before(node, parent)
        dom.append(parent, node)
    },
    // 删除节点
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    // 删除后代
    empty(node){
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        };
        return array
    },
    // 用与读写属性
    attr(node, name, value){ //重载
        if(arguments.length === 3){
            node.setAttribute(name, value)
        }else if(arguments.length === 2){
            return node.getAttribute(name)
        }
    },
    text(node, string){
        if(arguments.length === 2){
            if('innerText' in node){ // 适配
                node.innerText = string // IE
            }else{
                node.textContent = string // firefox / chrome
            }
        }else{
            if('innerText' in node){ // 适配
                return node.innerText
            }else{
                return node.textContent
            }
        }
    },
    html(node, string){
        if(arguments.length === 2){
            node.innerHTML = string
        }else if(arguments.length === 1){
            return node.innerHTML
        }
    },
    style(node, name, value){
        if(arguments.length === 3){
            node.style[name] = value
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                return node.style[name]
            }else if(name instanceof Object){
                for(let key in name){
                    node.style[key] = name[key]
                }
            }
        }
    },
    class:{
        // 用与添加 style
        add(node, className){
            node.classList.add(className)
        },
        // 用于删除class
        remove(node, className){
            node.classList.remove(className)
        },
        // 用于检查是否有该class
        has(node, className){
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn){
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn)
    },
    // 用于获取标签
    find(selector, scope){
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n => n !== node)
    },
    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    each(nodeList, fn){
        for(let i=0;i<nodeList.length; i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list = dom.children(node.parentNode)
        let i
        for(i = 0; i<list.length; i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
};