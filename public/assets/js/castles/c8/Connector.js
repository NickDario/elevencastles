/**
 * Created by ndario on 5/16/15.
 */

define(function(){

    var Connector = function(options)
    {
        this.public = {
            input  : options['public']['input']  != null ? options['public']['input'] : false,
            output : options['public']['output'] != null ? options['public']['output'] : false
        };

        this.pins = [];
    };

    Connector.prototype.setInputPins = function(map)
    {
        for(var x in map) {
            this.pin_in = {}
        }
    };

    Connector.prototype.setOutputPins = function(map)
    {

    };

    Connector.prototype.spike = function(inputs)
    {

    }





});
