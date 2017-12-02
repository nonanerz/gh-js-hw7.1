var draggableObject = null
var mouseOffset = null
var draggableField = document.getElementById('draggable-field')

draggableField.addEventListener('mousedown', function(event)
{
    draggableObject = event.target
    draggableObject.className = 'selected'

    var pos = getPosition(draggableObject)

    mouseOffset= {
        x: event.pageX - pos.x,
        y: event.pageY - pos.y
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
        console.log(draggableField.offsetLeft + draggableField.offsetWidth, draggableObject.offsetLeft)

        if (
            (draggableField.offsetLeft - event.pageX + mouseOffset.x) < 0 &&
            (draggableField.offsetLeft + draggableField.offsetWidth - draggableObject.offsetLeft - 60) > 0
        )
        {
            draggableObject.style.left = event.pageX - mouseOffset.x + 'px'
        }

        if (
            (draggableField.offsetTop - event.pageY + mouseOffset.y) < 0 &&
            (draggableField.offsetTop + draggableField.offsetHeight - draggableObject.offsetTop - 20) > 0
        )
        {
            draggableObject.style.top = event.pageY - mouseOffset.y  + 'px'
        }

    }
}, false)




function getPosition(e){
    var left = 0
    var top  = 0

    while (e.offsetParent){
        left += e.offsetLeft
        top  += e.offsetTop
        e	 = e.offsetParent
    }

    left += e.offsetLeft
    top  += e.offsetTop

    return {x:left, y:top}
}