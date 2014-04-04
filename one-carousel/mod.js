$(function() {
    // var
    var w = 600
    var n = 7
    var speed = 100
    var autoSpeed = 2000 // 自动切换时间
    
    // init
    var cur = 0
    isHover = false
    var timer
    var navLi = $('.navbar span').eq(0).addClass('cur').end() 
    var ul = $('ul.main')
    $('ul.main li:eq(0)').clone().appendTo(ul) // clone one
    
    // bindEvent
    $('a.i').click(handler)
    navLi.mouseover(handler)
    ul.hover(function(ev) {
        if (ev.type == 'mouseenter') return isHover = true
        autorun()
        isHover = false
    })
    
    autorun()
    
    function handler(ev) {
        if (ul.is(':animated')) return
        if (ev.type == 'click') {
            var flag = -1 // 后退
            if ($(this).is('.next')) flag = 1 // 前进
            if (flag === -1 && cur === 0) {
                // 第一个后退
                ul.css({left: '-' + n * w + 'px'})
                cur = n
            } else if (flag === 1 && cur === n) {
                ul.css({left: '0px'})
                cur = 0
            }
            cur = cur + flag           
        } else if (ev.type == 'mouseover') {
            var index = $(this).index()
            if ((cur + n) % n === index) return
            cur = index            
        }
        ul.animate({left: '-' + cur * w + 'px'}, speed)
        navLi.removeClass('cur').eq(cur - n).addClass('cur')
        autorun()
    }
    
    // 关于autorun, hover时停止, 点击后重新计时, 因此应该是用setTimeout
    
    function autorun() {
        clearTimeout(timer)
        timer = setTimeout(function() {
            autorun()
            if (isHover) return
            $('.next').click()
        }, autoSpeed)
    }
    
})
