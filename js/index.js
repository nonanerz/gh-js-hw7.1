var draggableObject = null
var mouseOffset = null
var draggableField = document.getElementById('draggable-field')
var pos

draggableField.addEventListener('touchstart', onTouch, false)
draggableField.addEventListener('mousedown', onTouch, false)

function onTouch(event)
{
    event.preventDefault()
    draggableObject = event.target

    if (draggableObject.id === 'draggable-field') {
        //create draggable object
        var child = document.createElement('div')
            child.setAttribute('class', 'draggable')
        if (event.type === 'touchstart') {
            child.innerText = getLorem(Math.floor(Math.random() * 3) + 1)
            child.style.top = event.touches[0].clientY - event.target.offsetTop - 10 + 'px'
            child.style.left = event.touches[0].clientX - event.target.offsetLeft - 30 + 'px'
            draggableObject.appendChild(child)
        } else {
            child.innerText = getLorem(Math.floor(Math.random() * 4) + 1)
            child.style.top = event.y - event.target.offsetTop - 10 + 'px'
            child.style.left = event.x - event.target.offsetLeft - 30 + 'px'
            draggableObject.appendChild(child)
        }
    } else if (draggableObject.id === 'remove') {
        //remove draggable object
            var wrapper = document.getElementById('last-selected').parentNode
                wrapper.removeChild(document.getElementById('last-selected'))
    } else {
        pos = getPosition(draggableObject)

        if (event.type === 'touchstart') {
            event.pageX = event.changedTouches[0].pageX;
            event.pageY = event.changedTouches[0].pageY;
        }

        mouseOffset= {
            x: event.pageX - pos.x,
            y: event.pageY - pos.y
        }

        //remove x button if so exists
        if (document.getElementById('last-selected') && document.getElementById('last-selected') !== draggableObject) {
            var elem = document.getElementById('last-selected')
            elem.removeAttribute('id')
            elem.removeChild(document.getElementById('remove'))
        }
        draggableObject.setAttribute('id', 'last-selected')
        if (!draggableObject.contains(document.getElementById("remove"))) {
            var childDiv = document.createElement('div')
            childDiv.setAttribute('id', 'remove')
            childDiv.innerText = 'x'
            draggableObject.appendChild(childDiv)
        }
        var removeElement = document.getElementById('remove')

        if (event.x - draggableField.offsetLeft - mouseOffset.x > 30) {
            removeElement.style.float = 'left'
            removeElement.style.borderRight = '1px solid black'
            removeElement.style.borderLeft = '0'
        } else {
            removeElement.style.float = 'right'
            removeElement.style.borderLeft = '1px solid black'
            removeElement.style.borderRight = '0'
        }
    }
}



document.querySelector('body').addEventListener('mouseup', onTouchEnd, false)
document.querySelector('body').addEventListener('touchend', onTouchEnd, false)

function onTouchEnd() {
    draggableObject = null
}

document.querySelector('body').addEventListener('touchmove', onMove, false)
document.querySelector('body').addEventListener('mousemove', onMove, false)

function onMove(event) {
    if (draggableObject && draggableObject.classList.contains('draggable')) {

        var removeElement = document.getElementById('remove')

        if (event.type === 'touchmove') {
            event.x = event.changedTouches[0].pageX;
            event.y = event.changedTouches[0].pageY;
        }

        if (event.screenX - mouseOffset.x - draggableField.offsetLeft > 30) {
            removeElement.style.float = 'left'
            removeElement.style.borderRight = '1px solid black'
            removeElement.style.borderLeft = '0'
        } else {
            removeElement.style.float = 'right'
            removeElement.style.borderLeft = '1px solid black'
            removeElement.style.borderRight = '0'
        }

        var domRect = draggableField.getBoundingClientRect()


        var draggableFieldPos = {
            top: domRect.top + draggableField.clientTop,
            left: domRect.left + draggableField.clientLeft
        }

        var draggableObjectPos = {
            top: event.clientY - draggableFieldPos.top - draggableObject.clientHeight / 2,
            left: event.clientX - draggableFieldPos.left - draggableObject.clientWidth / 2
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

        draggableObject.style.left = draggableObjectPos.left + 'px'
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

