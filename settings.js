//기타 설정 관련

const ARROWKEYS = {
    'ArrowLeft':37,
    'ArrowUp':38,
    'ArrowRight':39,
    'ArrowDown':40
};
window.addEventListener('keydown', function(e) {
    if (ARROWKEYS[e.key]) {
        e.preventDefault();
    }
});

document.oncontextmenu = function(e)
{
    return false;
}