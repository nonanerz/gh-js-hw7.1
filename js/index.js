var draggableObject = null
var mouseOffset = null
var draggableField = document.getElementById('draggable-field')

draggableField.addEventListener('touchstart', onTouch, false)
draggableField.addEventListener('mousedown', onTouch, false)

function onTouch(event)
{
    event.preventDefault()
    draggableObject = event.target
    var pos = getPosition(draggableObject)
    mouseOffset= {
        x: event.pageX - pos.x,
        y: event.pageY - pos.y
    }
    if (draggableObject.id === 'draggable-field') {
        var child = document.createElement('div')
            child.setAttribute('class', 'draggable')
        if (event.type === 'touchstart') {
            child.innerText = getLorem(Math.floor(Math.random() * 3) + 1)
            child.style.top = event.targetTouches[0].clientY - 10 + 'px'
            child.style.left = event.targetTouches[0].clientX - 30 + 'px'
            draggableObject.appendChild(child)
        } else {
            child.innerText = getLorem(Math.floor(Math.random() * 4) + 1)
            child.style.top = event.offsetY - 10 + 'px'
            child.style.left = event.offsetX - 30 + 'px'
            draggableObject.appendChild(child)
        }
    } else if (draggableObject.id === 'remove') {
        var span = document.getElementById('remove').parentNode
            span.parentNode.removeChild(span)
    } else {
        if (document.getElementById('last-selected') && document.getElementById('last-selected') !== draggableObject) {
            var elem = document.getElementById('last-selected')
            elem.removeAttribute('id')
            elem.removeChild(document.getElementById('remove'))
        }
        draggableObject.classList.add('selected')
        draggableObject.setAttribute('id', 'last-selected')
        if (!draggableObject.contains(document.getElementById("remove"))) {
            var childDiv = document.createElement('div')
            childDiv.setAttribute('id', 'remove')
            childDiv.innerText = 'x'
            draggableObject.appendChild(childDiv)
        }
    }
}



document.querySelector('body').addEventListener('mouseup', onTouchEnd, false)
document.querySelector('body').addEventListener('touchend', onTouchEnd, false)

function onTouchEnd() {
    draggableObject.classList.remove('selected')
    draggableObject = null
}

document.querySelector('body').addEventListener('touchmove', onMove, false)
document.querySelector('body').addEventListener('mousemove', onMove, false)

function onMove(event) {
    if (draggableObject && draggableObject.classList.contains('draggable')) {

        var removeElement = document.getElementById('remove')

        if ((draggableField.offsetWidth - event.offsetX) > 15) {
            removeElement.style.float = 'left'
            removeElement.style.borderRight = '1px solid black'
            removeElement.style.borderLeft = '0'
        } else {
            removeElement.style.float = 'right'
            removeElement.style.borderLeft = '1px solid black'
            removeElement.style.borderRight = '0'
        }

        if (event.type === 'mousemove') {

            console.log(event.offsetX, event.offsetY)

                draggableObject.style.left = event.offsetX - mouseOffset.x + 'px'

                draggableObject.style.top = event.offsetY + 'px'

        } else {
            if (
                (draggableField.offsetLeft - event.changedTouches[0].pageX) < 0 &&
                (draggableField.offsetLeft + draggableField.offsetWidth - event.changedTouches[0].pageX - draggableObject.clientWidth - 2) > 0
            )
            {
                draggableObject.style.left = event.changedTouches[0].clientX + 'px'
            }
            if (
                (draggableField.offsetTop - event.changedTouches[0].pageY) < 0 &&
                (draggableField.offsetTop + draggableField.offsetHeight - event.changedTouches[0].pageY - 22) > 0
            )
            {
                draggableObject.style.top = event.changedTouches[0].pageY + 'px'
            }
        }
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

