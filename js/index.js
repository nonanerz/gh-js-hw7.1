var draggableObject = null
var mouseOffset = null
var draggableField = document.getElementById('draggable-field')

draggableField.addEventListener('mousedown', onTouch, false)

function onTouch(event)
{
    draggableObject = event.target
    var pos = getPosition(draggableObject)
    mouseOffset= {
        x: event.pageX - pos.x,
        y: event.pageY - pos.y
    }
    if (draggableObject.id === 'draggable-field') {
        var child = document.createElement('span')
        child.innerText = getLorem(Math.floor(Math.random() * 4) + 1)
        child.style.top = event.clientY - 10 + 'px'
        child.style.left = event.clientX - 30 + 'px'
        draggableObject.appendChild(child)

    } else if (draggableObject.id === 'remove') {
        var span = document.getElementById('remove').parentNode
        span.parentNode.removeChild(span)
    } else {
        if (document.getElementById('last-selected') && document.getElementById('last-selected') !== draggableObject) {
            var elem = document.getElementById('last-selected')
            elem.removeAttribute('id')
            elem.removeChild(document.getElementById('remove'))
        }
        draggableObject.className = 'selected'
        draggableObject.setAttribute('id', 'last-selected')
        if (!draggableObject.contains(document.getElementById("remove"))) {
            var childDiv = document.createElement('div')
            childDiv.setAttribute('id', 'remove')
            childDiv.innerText = 'x'
            draggableObject.appendChild(childDiv)
        }
    }
}

document.getElementById('draggable-field').addEventListener('mouseup', onTouchEnd, false)
document.getElementById('draggable-field').addEventListener('touchend', onTouchEnd, false)

function onTouchEnd() {
    draggableObject.className = ''
    draggableObject = null
}

document.getElementById('draggable-field').addEventListener('mousemove', onMove, false)
document.getElementById('draggable-field').addEventListener('touchmove', onMove, false)

function onMove(event) {
    if (draggableObject) {
        if (
            (draggableField.offsetLeft - event.pageX + mouseOffset.x) < 0 &&
            (draggableField.offsetLeft + draggableField.offsetWidth - event.pageX + mouseOffset.x - draggableObject.clientWidth - 2) > 0
        )
        {
            draggableObject.style.left = event.pageX - mouseOffset.x + 'px'
        }
        if (
            (draggableField.offsetTop - event.pageY + mouseOffset.y) < 0 &&
            (draggableField.offsetTop + draggableField.offsetHeight - event.pageY + mouseOffset.y - 22) > 0
        )
        {
            draggableObject.style.top = event.pageY - mouseOffset.y  + 'px'
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
        'dolor',
        'sit',
        'amet'
    ]
    var wordCount = (len > words.length) ? (words.length - 1) : len
    var extracted = []

    for (var i = 0; i < wordCount; i++) {
        var word = Math.floor(Math.random() * words.length)
        extracted[i] = words[word]
    }
    return extracted.join(' ')
}

