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

        if (event.x - draggableField.offsetLeft - mouseOffset.x > 30 || draggableField.offsetLeft - event.changedTouches[0].pageX  + event.target.clientWidth < 10) {
            removeElement.style.float = 'left'
            removeElement.style.borderRight = '1px solid black'
            removeElement.style.borderLeft = '0'
        } else {
            removeElement.style.float = 'right'
            removeElement.style.borderLeft = '1px solid black'
            removeElement.style.borderRight = '0'
        }

        if (event.type === 'mousemove') {
            if (event.x - draggableField.offsetLeft - mouseOffset.x > 0 &&
                (draggableField.offsetWidth - event.x + draggableField.offsetLeft + mouseOffset.x - draggableObject.clientWidth - 3 > 0)
            ) {
                draggableObject.style.left = event.x - draggableField.offsetLeft - mouseOffset.x + 'px'
            }
            if (event.y - draggableField.offsetTop - mouseOffset.y > 0 &&
                (draggableField.offsetHeight - event.y + draggableField.offsetTop + mouseOffset.y - 2 - draggableObject.clientHeight > 0)
            ) {
                draggableObject.style.top = event.y - draggableField.offsetTop - mouseOffset.y + 'px'
            }
        } else {

            if (
                (draggableField.offsetLeft - event.changedTouches[0].pageX + event.target.clientWidth / 2) < 0 &&
                (draggableField.offsetLeft + draggableField.offsetWidth - event.changedTouches[0].pageX - draggableObject.clientWidth - 5 + event.target.clientWidth / 2) > 0
            )
            {
                draggableObject.style.left = event.touches[0].clientX - draggableField.offsetLeft - event.target.clientWidth / 2 + 'px'
            }
            if (
                (draggableField.offsetTop - event.changedTouches[0].pageY + event.target.clientHeight) < 0 &&
                (draggableField.offsetTop + draggableField.offsetHeight - event.changedTouches[0].pageY) > 0
            )
            {
                draggableObject.style.top = event.touches[0].clientY - draggableField.offsetTop - event.target.clientHeight + 'px'
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

