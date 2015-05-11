function xCroller(param1,param2){
    xCroller.start(param1,param2);
}

function xcroller(param1,param2){
    new xCroller(param1,param2);
}

xCroller.ready = false;
xCroller.top = 0;
xCroller.sticky = new Array();
xCroller.moving = new Array();
xCroller.attached_scroll = false;

xCroller.start = function(selector,params){
    if(xCroller.ready){
        xCroller.run(selector,params);
        return;
    }

    var timer;
    var verifier = function(){
        if('jQuery' in window || jQuery){
            if($('body').length) xCroller.ready = true;
        }

        if(!xCroller.ready){
            timer = setTimeout(function(){
                verifier();
            },250);
        }else{

            clearTimeout(timer);

            $(document).ready(function(){
                $('document, body, html').scrollTop(0);
                xCroller.run(selector,params);
            });
        }
    };

    verifier();
};

(function(){
    var has_started = false;
    var starter = function(){
        has_start = true;
        var data_xcroller = document.body.getAttribute('data-xcroller');
        if(data_xcroller){
            data_xcroller = data_xcroller.toLowerCase();
            if(data_xcroller === 1 || data_xcroller === '1' || data_xcroller === 'true' || data_xcroller === true || data_xcroller === 'xcroller'){
                xCroller.start();
            }
        }
    };

    var verifier = function(){
        if(has_started) return false;
        setTimeout(function(){
            if(!document.body) verifier();
            else starter();
        }, 100);
    };

    verifier();
})();

xCroller.run = function(param1,param2){
    var params = null, selector = null;
    if(param1){
        if(jQuery.type(param1) === 'string'){
            selector = param1;
            if(param2) params = param2;
        }else{
            params = param1;
            if(param2) selector = param2;
        }
    }

    if(!selector) selector = '.xcroller';

    xCroller.top = 0;
    var yd,xd,tip,lip,ii,axis,w,b,has,z_index,position,tp,lp,infinite,xi,xf,yi,yf,vs,hs,el_w,el_h,el,k,bis,posx,c,bgpt,bgpl,offset,clone,sticky,fixed,sibling,sibling_margin,index=1;
    var mode;

    $(selector).each(function(){
        el = $(this);

        mode = el.attr('data-xcmode');
        if(!mode && params) mode = params.mode;
        if(!mode) mode = 'moving';
        mode = mode.toLowerCase();

        if(mode == 'sticky'){
            sibling = el.next();
            sibling_margin = parseInt(sibling.css('margin-top').replace('px',''));
            sibling_margin += el.outerHeight(true);
            sibling.css('margin-top',sibling_margin);
            offset = el.offset();
            tp = offset.top;
            lp = offset.left;
            el.css('width',el.width());
            el.css('position','absolute');
            el.css('left',lp);
            el.css('top',tp);

            ii=0;
            el.siblings().each(function(){
                z_index = $(this).css('z-index');
                position = $(this).css('position');
                if(!z_index || z_index == 'auto'){ $(this).css('z-index',ii); }
                if(position != 'absolute' && position != 'fixed' && position != 'relative'){ $(this).css('position','relative'); }
                ii++;
            });
            //el.css('z-index',-1);
            //jQuery,initial left, initial top, current left, current top,last scroll y
            xCroller.sticky.push([el,lp,tp,lp,tp,0]);
        }else if(mode == 'moving' || mode == 'infinite'){
            el.css('position','relative');
            el.css('z-index',index);
            el.css('background-repeat','repeat');
            bis = new BIS(el);
            if(bis.has){
                bis.get(function(bi_size,params){
                    el = params.el;
                    index = params.index;

                    hs = el.attr('data-xchs');
                    if(!hs) hs = el.attr('data-xchorizontal');
                    if(!hs){
                        if(params) {
                            if('hs' in params) hs = params.hs;
                            else if('horizontal' in params) hs = params.horizontal;
                            else hs = 0;
                        }else hs = 0;
                    }else hs = parseFloat(hs);

                    vs = el.attr('data-xcvs');
                    if(!vs) vs = el.attr('data-xcvertical');
                    if(!vs){
                        if(params){
                            if('vs' in params) vs = params.vs;
                            else if('vertical' in params) vs = params.vertical;
                            else vs = 1+(index);
                        }
                        else vs = 1+(index);
                    }else vs = parseFloat(vs);

                    if(mode == 'infinite') infinite = true;
                    else infinite = false;

                    axis = el.attr('data-xcaxis');
                    if(!axis && params && 'axis' in params) axis = params.axis;
                    if(axis === 1 || axis === '1' || axis === 'true' || axis === true) axis = true;
                    else axis = false;
                    axis = true;

                    el_w = el.outerWidth();
                    el_h = el.outerHeight();

                    if(hs > 0){
                        xi = bgpl = 0;
                        xf = el_w - bi_size.width;
                    }else if(hs < 0){
                        xi = bgpl = el_w - bi_size.width;
                        xf = 0;
                    }else xf = bgpl = xi = 0;

                    if(vs > 0){
                        yi = bgpt = 0;
                        yf = el_h - bi_size.height;
                    }else{
                        yi = bgpt = el_h - bi_size.height;
                        yf = 0;
                    }

                    el.css('background-position',(bgpl)+'px '+(bgpt)+'px');
                    //jQuery,1 horizontal speed,2 vertical speed,3 start left,4 start top,5 left step,6 top step,7 last scroll left,8 last scroll top,9 width,10 height,11 last left position,12 last top position,13 element width,14 element height,15 infinite, 16 initial limit x, 17 final limit x, 18 initial limit y, 19 final limit y, 20 axis
                    xCroller.moving.push([el,hs * -1,vs * -1,bgpl,bgpt,0,0,0,0,bi_size.width,bi_size.height,bgpl,bgpt,el_w,el_h,infinite,xi,xf,yi,yf,axis]);
                },{el:el, index:index});
            }
        }else if(mode == 'fixed'){
            el.css('background-attachment','fixed');
            el.css('background-size','cover');
            el.css('background-position','center center');
        }

        index++;
    });

    if(!xCroller.attached_scroll){
        xCroller.attached_scroll = true;
    w = $(window);
    tip = w.scrollTop();

    w.scroll(function(){
        posy = w.scrollTop();
        //posx = w.scrollLeft();
        //yd = posy - tip;
        //tip = posy;

        for(k in xCroller.moving){
            c = xCroller.moving[k];
            el = c[0];
            b = xCroller.isOnViewport(el);
            if(b){

                if(c[20]) pos = posy;

                lp = c[5]; tp = c[6];
                if(c[8] < pos){ tp++; lp++; }
                else if(c[8] > pos){ tp--; lp--; }

                c[8] = pos;

                cx = c[3] + Math.floor(lp * c[1]);
                if(!c[15]){
                    if(c[1] > 0){
                        if(cx < c[16] || cx > c[17]) cx = c[11];
                        else c[5] = lp;
                    }else if(c[1] < 0){
                        if(cx > c[16] || cx < c[17]) cx = c[11];
                        else c[5] = lp;
                    }else c[5] = lp;
                }else c[5] = lp;

                cy = c[4] + Math.floor(tp * c[2]);
                if(!c[15]){
                    if(c[2] > 0){
                        if(cy < c[18] || cy > c[19]) cy = c[12];
                        else c[6] = tp;
                    }else if(c[2] < 0){
                        if(cy > c[18] || cy < c[19]) cy = c[12];
                        else c[6] = tp;
                    }else c[6] = tp;
                }else c[6] = tp;

                c[11] = cx;
                c[12] = cy;

                var coords = cx+'px '+cy+ 'px';
                el.css({'background-position': coords,'-moz-background-position': coords});

                xCroller.moving[k] = c;
            }
        }

        for(k in xCroller.sticky){
            c = xCroller.sticky[k];
            tp = c[0].offset().top;

            if(posy > c[5]){
                if(posy > c[2]){
                    c[0].css('position','fixed');
                    c[0].css('top','0');
                }
            }else if(posy < c[5]){
                if(posy < c[2]){
                    c[0].css('position','absolute');
                    c[0].css('top',c[2]);
                }
            }

            c[5] = posy;
        }
    });

    }
    xCroller.selector = null;
};

xCroller.isOnViewport = function(el){
    var vpw = $(window).width();
    var vph = $(window).height();

    var pyi = $(window).scrollTop();
    var pyf = pyi + vph;

    var pxi = $(window).scrollLeft();
    var pxf = pxi + vpw;

    var b = xCroller.boundaries(el);

    if(b.top < pyf && b.bottom > pyi){
        if(b.left < pxf && b.right > pxi){
            return $(el).get(0).getBoundingClientRect();
        }
    }

    return false;
};

xCroller.boundaries = function(el){
    var offset = el.offset();
    var eyi = offset.top;
    var eyf = eyi + el.outerHeight();
    var exi = offset.left;
    var exf = exi + el.outerWidth();

    return {left: exi, right: exf, top: eyi, bottom: eyf};
};

function BIS(el){
    this.el = el;
    this.has = this.source = this.has(el);
}

BIS.prototype.has = function(){
    return BIS.has(this.el);
};

BIS.has = function(el){
    var bgi = el.css('background-image');
    if(!bgi || bgi.toLowerCase() == 'none') return false;
    if(bgi.indexOf('url(') === 0){
        if(bgi.indexOf(')') === bgi.length -1){
            var source = bgi.slice(4,bgi.length-1);
            if(source[0]== '"' || source[0]=="'"){
                return source.slice(1,source.length-1);
            }else return source;
        }
    }

    return bgi;
};

BIS.prototype.getImageRatio = function(callback,params){
    if(!this.source) return null;
    BIS.getImageRatio(this.source,callback,params);
};

BIS.prototype.getElementRatio = function(callback,params){
    var er = BIS.getElementRatio(this.el,callback,params);
    if(!callback) return er;
};


BIS.getElementRatio = function(el,callback,params){
    var er = el.outerWidth()/el.outerHeight();
    if(callback) callback(er,params);
    else return er;
};

BIS.getImageRatio = function(src,callback,params){
    var size = BIS.getImageSize(src,function(size,params){
        callback(size.width/size.height,params);
    });
};

BIS.prototype.getImageSize = function(callback,params){
    if(!this.source) callback(null,params);
    BIS.getImageSize(this.source,callback,params);
};

BIS.getImageSize = function(source,callback,params){
    var img = new Image();
    img.onload = function(){
        callback({width: img.width, height: img.height},params);
    };

    img.src = source;
};

BIS.prototype.get = function(callback,params){
    BIS.get(this.el,callback,params);
};

BIS.get = function(el,callback,params){
    if(!el) return null;
    if(el instanceof jQuery) el = $(el.get(0));
    else el = $($(el).get(0));

    var bgi = BIS.has(el);
    if(!bgi) return null;
    var bgs = el.css('background-size').toLowerCase();
    var size = {},i_size,el_width,el_height,s_width,s_height,parts,height,width,vpr,ir;

    if(bgs == 'cover'){
        BIS.getImageRatio(bgi,function(ir){
            vpr = BIS.getElementRatio(el);

            el_width = el.outerWidth();
            el_height = el.outerHeight();

            if(ir <= vpr){
                size.width = el_width;
                size.height = Math.floor(el_width/ir);
            }else{
                size.width = el_height * ir;
                size.height = el_height;
            }

            callback(size,params);
        });

    }else if(bgs == 'contain'){

        BIS.getImageRatio(bgi,function(ir){
            vpr = BIS.getElementRatio(el);

            el_width = el.outerWidth();
            el_height = el.outerHeight();

            if(ir <= vpr){
                size.width = el_height * ir;
                size.height = el_height;
            }else{
                size.width = el_width;
                size.height = Math.floor(el_width/ir);
            }

            callback(size,params);
        });

    }else if(bgs == 'auto' || bgs == 'initial' || bgs == 'auto auto'){
        BIS.getImageSize(bgi,function(size){
            callback(size,params);
        });
    }else if(bgs.indexOf('%') != -1 || bgs.indexOf('px') != -1){

        BIS.getImageSize(bgi,function(image_size){
            var proportion = function(a1,a2,b1){
                return (a2/a1)*b1;
            };

            parts = bgs.split(' ');
            if(parts.length == 1) parts[1] = 'auto';

            if(parts[0].toLowerCase() == 'auto'){
                size.width = image_size.width;
            }else{
                if(bgs.indexOf('%') != -1){
                    s_width = parseInt(parts[0].replace('%',''));
                    el_width = el.outerWidth();
                    size.width = proportion(100,el_width,s_width);
                }else size.width = parseInt(parts[0].replace('px',''));
            }

            if(parts[1].toLowerCase() == 'auto'){
                size.height = image_size.height;
            }else{
                if(bgs.indexOf('%') != -1){
                    s_height = parseInt(parts[1].replace('%',''));
                    el_height = el.outerHeight();
                    size.height = proportion(100,el_height,s_height);
                }else size.height = parseInt(parts[1].replace('px',''));
            }

            callback(size,params);
        });

    }else{
        callback({width: el.outerWidth(), height: el.outerHeight()},params);
    }
};
