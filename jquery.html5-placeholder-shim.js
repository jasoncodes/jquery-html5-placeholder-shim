(function($) {
	$.extend($,{ placeholder: {
			browser_supported: function() {
				return this._supported !== undefined ?
					this._supported :
					( this._supported = !!('placeholder' in $('<input type="text">')[0]) );
			},
			shim: function(opts) {
				var config = {
					color: '#888',
					cls: '',
					lr_padding:4
				};
				$.extend(config,opts);
				!this.browser_supported() && $('input[placeholder]')._placeholder_shim(config);
			}
	}});

	$.extend($.fn,{
		_placeholder_shim: function(config) {
			function calcPositionCss(target)
			{
				return {
					top: $(target).offset().top + ($(target).outerHeight() - $(target).height()) /2 + $(target).height()*.07,
					left: $(target).offset().left + config.lr_padding,
					width: $(target).width() - config.lr_padding
				};
			}
			return this.each(function() {
				if( $(this).data('placeholder') )
					return true;
				
				var ol = $('<label />')
					.text($(this).attr('placeholder'))
					.addClass(config.cls)
					.css({ 
						position:'absolute', 
						overflow:'hidden', 
						whiteSpace:'nowrap',
						textAlign: 'left',
						color: config.color, 
						fontSize: parseInt($(this).height() * .85)
					})
					.css(calcPositionCss(this))
					.data('target',$(this))
					.click(function(){
						$(this).data('target').focus()
					})
					.appendTo('body')
				$(this)
					.data('placeholder',ol)
					.focus(function(){
						ol.hide();
					}).blur(function() {
						ol[$(this).val().length ? 'hide' : 'show']();
					}).triggerHandler('blur');
			});
		} 
	});
	
})(jQuery);