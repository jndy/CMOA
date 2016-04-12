$(function() {
	var userAgent = navigator.userAgent;
	var reg = /Chrome\/[0-9]{2}/g;
	if (userAgent.search(reg) > 0) {
		var bStr = reg.exec(userAgent)[0];
		var bArr = bStr.split("/");
		var chromeV = bArr[1];
		var $chromeVersion = "chrome" + chromeV;
		$("html").addClass($chromeVersion)
	}
	$.ajax({
		url: "http://se.360.cn/config/download_url.html",
		type: "get",
		success: function(data) {
			var linkMap = {};
			var linkArr = data.split("\n");
			for (var i = 0, len = linkArr.length; i < len; i++) {
				var match = linkArr[i].match(/(.*?)(?:\:)([\s\S]*$)/);
				if (match) {
					linkMap[$.trim(match[1])] = $.trim(match[2])
				}
			}
			if (linkMap["7"]) {
				$("#se7").attr("href", linkMap["7"]);
				$("#se8").attr("href", linkMap["8"]);
				$(".download_82").attr("href", linkMap["8_2"])
			}
		}
	});
	var exportObj = {};

	function ieResize() {
		var swth = $(window).width(),
			addwth = swth % 2 == 0 ? 0 : 1;
		$(".ie_p2").width(swth + addwth)
	}
	$("body").animate({
		scrollTop: 0
	}, 0);

	function initAll() {
		ieResize();
		if ($.browser.msie && parseInt($.browser.version) < 10) {
			return
		}
		var mouseTodo = false,
			skin_index = 1,
			clear_brwser_skin;
		$(document).on("mousewheel", function(event, delta, deltaX, deltaY) {
			if (mouseTodo) {
				return false
			}
			var winStop = $(window).scrollTop();
			var winH = $(window).height();
			if (delta < 0) {
				if (winStop < 958) {
					if (winH < 580) {
						$("html,body").animate({
							scrollTop: "958px"
						}, 2550, function() {
							mouseTodo = false;
							$(".allwave,.hands").fadeIn()
						})
					} else {
						$("html,body").animate({
							scrollTop: "1052px"
						}, 2550, function() {
							mouseTodo = false;
							$(".allwave,.hands").fadeIn()
						})
					}
					mouseTodo = true
				}
				if (winStop < 1764 && winStop >= 958) {
					if (winH < 580) {
						$("html,body").animate({
							scrollTop: $(".page_2").offset().top + "px" || "1764px"
						}, 800, function() {
							mouseTodo = false
						})
					} else {
						$("html,body").animate({
							scrollTop: $(".page_2").offset().top + "px" || "1858px"
						}, 800, function() {
							mouseTodo = false
						})
					}
					mouseTodo = true
				}
				if (winStop < 2656 && winStop >= 1744) {
					if (winH < 580) {
						$("html,body").animate({
							scrollTop: $(".page_3").offset().top + "px" || "2656px"
						}, 800, function() {
							mouseTodo = false
						})
					} else {
						$("html,body").animate({
							scrollTop: $(".page_3").offset().top + "px" || "2750px"
						}, 800, function() {
							mouseTodo = false
						})
					}
					mouseTodo = true
				}
				if (winStop < 3815 && winStop > 2656) {
					if (winH < 580) {
						$("html,body").animate({
							scrollTop: $(".page_4").offset().top + "px" || "3815px"
						}, 800, function() {
							mouseTodo = false
						})
					} else {
						$("html,body").animate({
							scrollTop: $(".page_4").offset().top + "px" || "3899px"
						}, 800, function() {
							mouseTodo = false
						})
					}
					mouseTodo = true
				}
			}
		});
		$(document).on("scroll", function(e) {
			var scrollTop = $(window).scrollTop();
			var WinH = $(window).height();
			if (scrollTop + 250 >= $(".page_1").offset().top) {
				if (!$(".page_1").hasClass("addAnimation")) {
					clearTimeout(clear_brwser_skin);
					$(".titleAnim2,.titleAnim3").animate({
						"opacity": 0
					}, 500)
				}
				$(".page_1").addClass("addAnimation")
			}
			if (scrollTop + 250 < $(".page_1").offset().top) {
				if ($(".page_1").hasClass("addAnimation")) {
					$(".titleAnim2,.titleAnim3").delay(500).animate({
						"opacity": 1
					}, 500)
				}
				$(".page_1").removeClass("addAnimation");
				$(".allwave,.hands").hide();
				clearTimeout(clear_brwser_skin);
				skin_index = 1;
				$(".skin").removeClass("active");
				$(".brwser_skin").hide();
				$(".defskin").show()
			}
			if (scrollTop >= $(".page_2").offset().top - 100) {
				$(".page_2").addClass("addAnimation")
			}
			if (scrollTop < $(".page_2").offset().top - $(window).height() / 2) {
				$(".page_2").removeClass("addAnimation")
			}
			if (scrollTop >= $(".page_3").offset().top - 100) {
				$(".page_3").addClass("addAnimation")
			}
			if (scrollTop < $(".page_3").offset().top - $(window).height() / 2) {
				$(".page_3").removeClass("addAnimation")
			}
			if (scrollTop >= $(".lastwrap").offset().top || $(".footer").offset().top <= scrollTop + WinH) {
				$(".p4ct").addClass("floatAm")
			}
			if (scrollTop < $(".p4ct").offset().top - $(window).height() / 2) {
				$(".p4ct").removeClass("floatAm")
			}
		});

		function brwser_skin() {
			var brwser_skin_ = "brwser_skin_";
			for (var i = 1; i < 6; i++) {
				$("." + brwser_skin_ + i).fadeOut(600);
				if (i !== 0) {
					$("#skin_" + i).removeClass("active")
				}
			}
			$("." + brwser_skin_ + skin_index).fadeIn(600);
			$("#skin_" + skin_index).addClass("active");
			skin_index++;
			if (skin_index > 5) {
				skin_index = 1
			}
			if (clear_brwser_skin) {
				clearTimeout(clear_brwser_skin)
			}
			clear_brwser_skin = setTimeout(brwser_skin, 3000)
		}
		$(".skin").mouseenter(function() {
			$(".hands,.defskin").hide();
			$(".brwser_skin,.skin").removeClass("active");
			$(".brwser_skin").stop(true, true).fadeOut(250);
			$(".brwser_" + this.id).addClass("active").stop(true, true).fadeIn(250);
			$(this).addClass("active");
			skin_index = this.id.split("_")[1];
			clearTimeout(clear_brwser_skin);
			$(".page_1").data("mouseleave", true)
		});
		$(".skin").mouseleave(function() {
			clearTimeout(clear_brwser_skin);
			if (skin_index >= 5) {
				skin_index = 1
			} else {
				skin_index++
			}
			if (!$(".page_1").data("mouseleave")) {
				return false
			}
			clear_brwser_skin = setTimeout(brwser_skin, 2500);
			$(".page_1").data("mouseleave", false)
		});
		var initPos;

		function scrollpage() {
			var wrap = $(".page_3"),
				wht = $(window).height(),
				dtop = 0;
			if (wht < 850) {}
			initPos = initPos || wrap.offset().top - dtop;
			if ($(window).scrollTop() >= initPos) {
				if (!deg) {
					rotate()
				}
			} else {}
		}
		var wrap = $(".bwrap"),
			bwrap = wrap.offset().top,
			sht = 650,
			s1 = bwrap - $(window).height() / 3,
			t1 = bwrap - s1,
			cachData = bwrap - t1,
			e1 = s1 + sht,
			defdeg = 25;

		function scrollBrowser() {
			var stop = $(window).scrollTop();
			if (wrap.css("position") != "fixed" && stop < e1 && stop > s1) {
				wrap.css({
					"position": "fixed",
					"top": t1
				});
				$(".btab").stop(true, true).fadeIn();
				$(".bwave").css({
					"opacity": 0,
					"display": "none"
				});
				$(".defskin").removeClass("changebg");
				clearTimeout(clear_brwser_skin);
				$(".brwser_skin").hide();
				$(".defskin").show()
			}
			var dis = (stop - cachData) * (defdeg / sht);
			var alp = 1 - (stop - cachData) * (1 / sht);
			var scale = (stop - cachData) * (0.08 / sht);
			var tab_top = (stop - cachData) * (41 / sht);
			var tab_left = (stop - cachData) * (49 / sht);
			var topalp = 0.75 - (stop - cachData) * (0.75 / sht);
			if (dis > defdeg || stop >= e1) {
				dis = defdeg;
				alp = 0;
				scale = 0.08;
				tab_top = 39;
				tab_left = 49;
				topalp = 0;
				if (wrap.css("position") != "absolute") {
					wrap.css({
						"position": "absolute",
						"top": cachData + sht - $(".page_1").offset().top + t1
					})
				}
				$(".btab").stop(true, true).fadeOut();
				$(".bwave").css({
					"opacity": 1,
					"display": "block"
				});
				$(".defskin").addClass("changebg")
			}
			if (dis < 0 || stop <= s1) {
				dis = 0;
				alp = 1;
				scale = 0;
				tab_top = 0;
				tab_left = 0;
				topalp = 0.75;
				if (wrap.css("position") == "fixed") {
					wrap.css({
						"position": "static",
						"top": 0
					})
				}
			}
			if (stop > 632) {
				$(".tilmask").hide()
			} else {
				$(".tilmask").show()
			}
			wrap.find(".brwser").css({
				"transform": "perspective(875px) rotateX(" + (defdeg - dis) + "deg)"
			});
			$(".wmask").css("opacity", alp);
			$(".btab").css({
				"transform": "scale(" + (1 - scale) + ")",
				"top": (47 - tab_top),
				"margin-left": -(tab_left + 373)
			});
			$(".browser_bg").css("opacity", 1 - alp)
		}
		var fix_wrap = $(".fixbg"),
			wht = $(window).height(),
			comp_bwrap = fix_wrap.offset().top,
			sht_cmp = 1200,
			cmp_s1 = comp_bwrap,
			cmp_t1 = wht > 680 ? comp_bwrap - cmp_s1 : -120,
			cmp_cachData = comp_bwrap - cmp_t1,
			cmp_e1 = cmp_s1 + sht_cmp,
			cmp_defdeg = 55;

		function scrollComputer() {
			var stop = $(window).scrollTop();
			if (fix_wrap.css("position") != "fixed" && stop < cmp_e1 && stop > cmp_s1) {
				fix_wrap.css({
					"position": "fixed",
					"top": cmp_t1
				});
				$(".ambg").css("opacity", 0)
			}
			var dis = (stop - cmp_cachData) * (cmp_defdeg / sht_cmp);
			var pdis = (stop - cmp_cachData) * (50 / sht_cmp);
			var frad = (stop - cmp_cachData) * (95 / sht_cmp);
			var alp = 1 - (stop - cmp_cachData) * (1 / sht_cmp);
			var scale = (stop - cmp_cachData) * (0.08 / sht_cmp);
			var tab_top = (stop - cmp_cachData) * (39 / sht_cmp);
			var tab_left = (stop - cmp_cachData) * (49 / sht_cmp);
			var topalp = 0.75 - (stop - cmp_cachData) * (0.75 / sht_cmp);
			if (dis > cmp_defdeg || stop >= cmp_e1) {
				dis = cmp_defdeg;
				pdis = 50;
				alp = 0;
				scale = 0.08;
				tab_top = 39;
				tab_left = 49;
				topalp = 0;
				if (fix_wrap.css("position") != "absolute") {
					fix_wrap.css({
						"position": "absolute",
						"top": cmp_cachData + sht_cmp - $(".page_2").offset().top + cmp_t1 + cmp_t1
					})
				}
				$(".btab").stop(true, true).fadeOut();
				$(".ambg").css("opacity", 1)
			}
			if (dis < 0 || stop <= cmp_s1) {
				dis = 0;
				pdis = 0;
				alp = 1;
				scale = 0;
				tab_top = 0;
				tab_left = 0;
				topalp = 0.75;
				if (fix_wrap.css("position") == "fixed") {
					fix_wrap.css({
						"position": "static",
						"top": 0
					})
				}
			}
			if (frad > 95) {
				frad = 95
			}
			if (frad < 0) {
				frad = 0
			}
			fix_wrap.find(".file_sh").css({
				"transform": "perspective(900px) translate(-" + caldata(160) + "px," + -caldata(2) + "px) rotateY(" + -(50 + caldata(36)) + "deg)"
			});
			fix_wrap.find(".file_pic").css({
				"transform": "perspective(900px) translate(-" + caldata(243) + "px," + caldata(16) + "px) rotateY(" + -(50 + caldata(38)) + "deg)"
			});
			fix_wrap.find(".file_ct").css({
				"transform": "perspective(900px) translate(-" + caldata(315) + "px," + -caldata(44) + "px) rotateY(" + -(50 + caldata(38)) + "deg)"
			});
			if (stop > (cmp_s1 + 600)) {
				fix_wrap.find(".computer").css({
					"transform": "perspective(2000px) rotateY(" + (cmp_defdeg - caldata_b(cmp_defdeg, 1)) + "deg)"
				});
				fix_wrap.find(".phone").css({
					"transform": "perspective(900px) rotateY(" + -(50 - caldata_b(50, 1)) + "deg)"
				});
				if (caldata_b(50, 1) > 15) {
					$(".inerphone").hide()
				} else {
					$(".inerphone").show()
				}
				fix_wrap.find(".file_sh,.file_pic,.file_ct").css({
					"transform": "perspective(900px) rotateY(" + (-caldata_b(50)) + "deg)"
				});
				$(".cpbomside").css({
					"transform": "translate(0," + caldata_b(5, 1) + "px) scale(" + (1 - caldata_b(8, 1) * 0.1) + ")"
				})
			} else {
				fix_wrap.find(".computer,.phone,.cpbomside").attr("style", "")
			}

			function caldata(fw, type) {
				var offset = 0;
				var scrollht = 600;
				var rel = fw - (stop - cmp_cachData - offset) * (fw / scrollht);
				if (type) {
					rel = (stop - cmp_cachData - offset) * (fw / scrollht)
				}
				if (rel > fw) {
					rel = fw
				}
				if (rel < 0) {
					rel = 0
				}
				return rel
			}

			function caldata_b(fw, type) {
				var offset = 600;
				var scrollht = 600;
				var rel = fw - (stop - cmp_cachData - offset) * (fw / scrollht);
				if (type) {
					rel = (stop - cmp_cachData - offset) * (fw / scrollht)
				}
				if (rel > fw) {
					rel = fw
				}
				if (rel < 0) {
					rel = 0
				}
				return rel
			}
		}

		function waveAnimate() {
			var tag = $(".wavewarp");
			tag.scrollLeft(tag.scrollLeft() + 1);
			setTimeout(waveAnimate, 200)
		}
		waving();

		function waving() {
			$(".page_1").addClass("animate")
		}
		var deg = 0;

		function rotate() {
			deg++;
			$(".point").css({
				"transform": "rotate(" + deg + "deg)"
			});
			if (deg < 360) {
				removeAm(".virus_1", 12);
				removeAm(".virus_2", 63);
				removeAm(".virus_3", 80);
				removeAm(".virus_4", 123);
				removeAm(".virus_5", 300);
				removeAm(".virus_6", 245);
				removeAm(".virus_7", 180)
			}
			setTimeout(rotate, 15)
		}

		function removeAm(name, tag) {
			if (deg % 360 != tag) {
				return
			}
			$(name).addClass("virusAm")
		}
		var AnimationFrame, cancelAnimationFrame;
		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(cb, t) {
			AnimationFrame = setTimeout(cb, t || 1)
		};
		window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame ||
		function(cb) {
			AnimationFrame = clearTimeout(cb)
		};

		function SiriWave(opt) {
			this.opt = opt || {};
			this.K = 1;
			this.F = 15;
			this.speed = this.opt.speed || 0.1;
			this.noise = this.opt.noise || 30;
			this.phase = this.opt.phase || 0;
			if (!window.devicePixelRatio) {
				devicePixelRatio = 1
			}
			this.width = devicePixelRatio * (this.opt.width || 320);
			this.height = devicePixelRatio * (this.opt.height || 100);
			this.MAX = (this.height / 2) - 4;
			this.canvas = $("#wave")[0];
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.canvas.style.width = (this.width / devicePixelRatio) + "px";
			this.canvas.style.height = (this.height / devicePixelRatio) + "px";
			this.ctx = this.canvas.getContext("2d");
			this.run = false
		}
		SiriWave.prototype = {
			_globalAttenuationFn: function(x) {
				return Math.pow(this.K * 4 / (this.K * 4 + Math.pow(x, 4)), this.K * 2)
			},
			_drawLine: function(attenuation, color, width, noise, F) {
				this.ctx.moveTo(0, 0);
				this.ctx.beginPath();
				this.ctx.strokeStyle = color;
				this.ctx.lineWidth = width || 1;
				var x, y;
				F = F || this.F;
				noise = noise * this.MAX || this.noise;
				for (var i = -this.K; i <= this.K; i += 0.01) {
					i = parseFloat(parseFloat(i).toFixed(2));
					x = this.width * ((i + this.K) / (this.K * 2));
					y = this.height / 2 + noise * Math.pow(Math.sin(i * 10 * attenuation), 1) * Math.sin(F * i - this.phase);
					this.ctx.lineTo(x, y)
				}
				this.ctx.lineTo(this.width, this.height);
				this.ctx.lineTo(0, this.height);
				this.ctx.fillStyle = color;
				this.ctx.fill()
			},
			_clear: function() {
				this.ctx.globalCompositeOperation = "destination-out";
				this.ctx.fillRect(0, 0, this.width, this.height);
				this.ctx.globalCompositeOperation = "source-over"
			},
			_draw: function() {
				if (!this.run) {
					return
				}
				this.phase = (this.phase + this.speed) % (Math.PI * 64);
				this._clear();
				this._drawLine(0.5, "rgba(120,255,212,0.5)", 1, 0.35, 6);
				this._drawLine(1, "rgba(0,188,62,0.5)", 1, 0.25, 6);
				clearAnimationFrame = requestAnimationFrame(this._draw.bind(this), 1000)
			},
			start: function() {
				this.phase = 0;
				this.run = true;
				this._draw()
			},
			stop: function() {
				this.run = false;
				this._clear()
			},
			setNoise: function(v) {
				this.noise = Math.min(v, 1) * this.MAX
			},
			setSpeed: function(v) {
				this.speed = v
			},
			set: function(noise, speed) {
				this.setNoise(noise);
				this.setSpeed(speed)
			},
			bl: function(val) {
				return 1920 / 15
			}
		};
		var SW = new SiriWave({
			width: $(window).width(),
			height: 200,
			container: $(".wavewarp")[1]
		});
		SW.setSpeed(0.01);
		SW.start();
		exportObj.SiriWave = SiriWave;
		canvasSty();

		function canvasSty() {
			var wth = $(window).width(),
				ht = Math.ceil(wth * (148 / 1903)),
				offset = Math.ceil(ht / 2 - 74),
				canvas = $("#hill")[0],
				ctx = canvas.getContext("2d");
			$(".content").css("top", -292 - offset);
			canvas.width = wth;
			canvas.height = ht;
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(wth, 0);
			ctx.lineTo(0, ht);
			ctx.fillStyle = "rgba(67,215,157,1)";
			ctx.fill()
		}
		exportObj.canvasSty = canvasSty
	}
	initAll();

	function optimiztionResize(fn, time) {
		var timer = null,
			__self = this;
		return function() {
			if (!timer) {
				timer = setTimeout(function() {
					clearTimeout(timer);
					timer = null;
					fn.apply(__self)
				}, time || 500)
			}
		}
	}
	$(window).resize(optimiztionResize(function() {
		ieResize();
		if ($.browser.msie && parseInt($.browser.version) < 10) {
			return
		}
		cancelAnimationFrame(clearAnimationFrame);
		var SW = new exportObj.SiriWave({
			width: $(window).width(),
			height: 200,
			container: $(".wavewarp")[1]
		});
		SW.setSpeed(0.01);
		SW.start();
		exportObj.canvasSty()
	}, 100));
	$(".tabnav_2").mouseenter(function() {
		$(this).parent().addClass("tabhover")
	}).mouseleave(function() {
		$(this).parent().removeClass("tabhover")
	});
	monitor.setProject("se_mainpage").getTrack().getClickAndKeydown()
});/**
 * Created by wish on 16/4/5.
 */
