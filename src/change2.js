/**
 * Change2 plugin
 * 
 * Change event that fires after a series of input value changes
 * 
 * @param {type} $
 * @returns {undefined}
 */
(function ($)
{            
   $.fn.change2 = function (fn)
   {
       /**
        * Wrap specified function to repeatedly delay execution
        * for every successive call to the wrapper function within
        * the specified timeout
        * 
        * @param {function} fn  Function to be executed
        * @param {int} timeout  Milliseconds timeout
        * 
        * @return {function} Returns a wrapper function which can be
        * repeatedly invoked to delay the function's execution
        */
       var suspend = function (fn, timeout)
       {
           var t = null;
           return function ()
           {
               clearTimeout(t);
               t = setTimeout(fn, timeout || 1000);
           };
       };

       fn = fn || function () { alert('Just watching...'); };
       var events = ['input'];

       // Use an alternate set of events for IE, however,
       // undo and redo events will not be supported
       /*@cc_on
       events = ['keyup', 'paste', 'cut'];
       @*/

       return this.each(function ()
       {
           var context = this, val = $(this).val();
           var eventAction = function ()
           {
               var currVal = $(context).val();
               if (val !== currVal) {
                   fn.apply(context);
                   val = currVal;
               }
           };

           for (var i = 0; i < events.length; i ++) {
               $(this).off(events[i]).on(events[i], suspend(eventAction, 1000));
           }
       });
   };
})(jQuery);
