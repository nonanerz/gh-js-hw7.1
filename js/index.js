var draggableObject = null
var mouseOffset = null

document.getElementById('draggable-field').addEventListener('mousedown', function(event)
{
    draggableObject = event.target
    draggableObject.className = 'selected'

    var pos = getPosition(draggableObject)

    mouseOffset= {
        x: event.pageX - pos.x,
        y: event.pageY - pos.y
    }

    console.log(pos)

}, false)

document.getElementById('draggable-field').addEventListener('mouseup', function()
{
    draggableObject.className = ''
    draggableObject = null

    console.log(draggableObject)

}, false)

document.getElementById('draggable-field').addEventListener('mousemove', function(event)
{
    var offsetX
    var offsetY
    if (draggableObject) {

        if (event.pageX - mouseOffset.x < 0) {
            offsetX = 0;
        } else if (event.pageX - mouseOffset.x + 102 > document.body.clientWidth) {
            offsetX = document.body.clientWidth - 102;
        } else {
            offsetX = event.pageX - mouseOffset.x;
        }

        if (event.pageY - mouseOffset.y < 0) {
            offsetY = 0;
        } else if (event.pageY - mouseOffset.y + 102 > document.body.clientHeight) {
            offsetY = document.body.clientHeight - 102;
        } else {
            offsetY = event.pageY - mouseOffset.y;
        }
        draggableObject.style.left = offsetX + 'px'
        draggableObject.style.top = offsetY  + 'px'
    }
    console.log(event.screenX, event.screenY)
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