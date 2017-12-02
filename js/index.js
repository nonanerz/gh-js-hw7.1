var draggableObject = null
var mouseOffset = null
var draggableField = document.getElementById('draggable-field')

draggableField.addEventListener('mousedown', function(event)
{
    if (event.target.tagName === 'IMG') {
        return false
    }
    draggableObject = event.target
    var pos = getPosition(draggableObject)
    mouseOffset= {
        x: event.pageX - pos.x,
        y: event.pageY - pos.y
    }
    if (draggableObject.id === 'draggable-field') {
        var child = document.createElement('span')
        child.style.top = event.clientY - 10 + 'px'
        child.style.left = event.clientX - 30 + 'px'
        draggableObject.appendChild(child)

    } else if (draggableObject.id === 'remove') {
        var span = document.getElementById('remove').parentNode
        span.parentNode.removeChild(span);
    } else {
        if (document.getElementById('last-selected') && document.getElementById('last-selected') !== draggableObject) {
            console.log(document.getElementById('last-selected'), draggableObject)

            var elem = document.getElementById('last-selected')
                elem.removeAttribute('id')
                elem.innerHTML = ''
        }
        draggableObject.className = 'selected'
        draggableObject.setAttribute('id', 'last-selected')
        draggableObject.innerHTML = '<div id="remove">x</div>'
    }
}, false)

document.getElementById('draggable-field').addEventListener('mouseup', function()
{
    draggableObject.className = ''
    draggableObject = null
}, false)

document.getElementById('draggable-field').addEventListener('mousemove', function(event)
{
    if (draggableObject) {
        if (
            (draggableField.offsetLeft - event.pageX + mouseOffset.x) < 0 &&
            (draggableField.offsetLeft + draggableField.offsetWidth - event.pageX + mouseOffset.x - 62) > 0
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
}, false)

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