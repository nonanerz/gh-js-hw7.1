var draggableObject = null
var mouseOffset = null
var draggableField = document.getElementById('draggable-field')
var draggableObjectPos
var active

draggableField.addEventListener('touchstart', onTouch, false)
draggableField.addEventListener('mousedown', onTouch, false)
document.querySelector('body').addEventListener('mouseup', onTouchEnd, false)
document.querySelector('body').addEventListener('touchend', onTouchEnd, false)
document.querySelector('body').addEventListener('touchmove', onMove, false)
document.querySelector('body').addEventListener('mousemove', onMove, false)

function onTouch(event)
{
    event.preventDefault()
    draggableObject = event.target

    if (draggableObject.id === 'draggable-field') {
        //create draggable object
        var child = document.createElement('div')
            child.setAttribute('class', 'draggable')
        if (event.type === 'touchstart') {
            event.y = event.touches[0].clientY
            event.x =event.touches[0].clientX
        }

        child.innerText = getLorem(Math.floor(Math.random() * 4) + 1)
        child.style.top = event.y - event.target.offsetTop - 10 + 'px'
        child.style.left = event.x - event.target.offsetLeft - 30 + 'px'
        draggableObject.appendChild(child)

        var childDiv = document.createElement('div')
            childDiv.setAttribute('class', 'remove')
            childDiv.innerText = 'x'
            child.appendChild(childDiv)

    } else if (draggableObject.classList.contains('remove')) {
        draggableField.removeChild(event.target.parentNode)
    } else {
        console.log(2)
        if (document.getElementById('active')) {
            active = document.getElementById('active')
            active.removeAttribute('id')
        }
        event.target.setAttribute('id', 'active')
        active = document.getElementById('active')
        var pos = getPosition(draggableObject)

        if (event.type === 'touchstart') {
            event.pageX = event.changedTouches[0].pageX;
            event.pageY = event.changedTouches[0].pageY;
        }

        mouseOffset= {
            x: event.pageX - pos.x,
            y: event.pageY - pos.y
        }
    }
}

function onTouchEnd() {
    draggableObject = null
}

function onMove(event) {
    if (draggableObject && draggableObject.classList.contains('draggable')) {
        var removeElement = event.target.children[0]

        var domRect = draggableField.getBoundingClientRect()

        var draggableFieldPos = {
            top: domRect.top + draggableField.clientTop,
            left: domRect.left + draggableField.clientLeft
        }

        if (event.type === 'touchmove') {
            draggableObjectPos = {
                top: event.changedTouches[0].clientY - draggableFieldPos.top - mouseOffset.y,
                left: event.changedTouches[0].clientX - draggableFieldPos.left - mouseOffset.x
            }
        } else {
            draggableObjectPos = {
                top: event.clientY - draggableFieldPos.top - mouseOffset.y,
                left: event.clientX - draggableFieldPos.left - mouseOffset.x
            }
        }

        if (draggableObjectPos.top < 0) draggableObjectPos.top = 0

        if (draggableObjectPos.left < 0) {
            draggableObjectPos.left = 0
        }
        if (draggableObjectPos.left + draggableObject.clientWidth > draggableField.clientWidth) {
            draggableObjectPos.left = draggableField.clientWidth - draggableObject.clientWidth
        }

        if (draggableObjectPos.top + draggableObject.clientHeight > draggableField.clientHeight) {
            draggableObjectPos.top = draggableField.clientHeight - draggableObject.clientHeight
        }
        draggableObjectPos.left > 30 ? removeElement.style.float = 'left' : removeElement.style.float = 'right'
        draggableObject.style.left = draggableObjectPos.left - 1 + 'px'
        draggableObject.style.top = draggableObjectPos.top + 'px'

    }
}

function getPosition(e) {
    var left = 0
    var top  = 0


    while (e.offsetParent) {
        left += e.offsetLeft
        top += e.offsetTop
        e = e.offsetParent
    }

    left += e.offsetLeft
    top += e.offsetTop

    return {
        x: left,
        y: top
    }
}

function getLorem(len) {
    var words = ['lorem',
        'ipsum',
        'dolor'
    ]
    var wordCount = (len > words.length) ? (words.length - 1) : len
    var extracted = []

    for (var i = 0; i < wordCount; i++) {
        var word = Math.floor(Math.random() * words.length)
        extracted[i] = words[word]
    }
    return extracted.join(' ')
}

