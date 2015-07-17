/**
 * Created by ndario on 5/16/15.
 */
define(function()
{
    var Neuron = function()
    {
        this.name = null;
        this.type = null;   // inhibitory vs excitory
        this.spiked = true;
        this.output = value;

        this._decay = 1;    //  Rate at which 'charge' passively decays
        this._kin = 1;      //  Defining size of exitory stimulus range
        this._kex = 1;      //  Defining size of inhibitory stimulus range

        this._threshhold = 1; // When inputs reach threshold trigger spike
        this.inputs = [];   // [name]=value - should define default weight for select names to implant memories?
    };

    Neuron.prototype.spike = function()
    {
        return {
            name: this.name,
            value: this.output
        }
    };

    Neuron.prototype.setInhibitionConstant = function(k)
    {
        this._kin = k;
    };

    Neuron.prototype.setExcitationConstant = function(k)
    {
        this._kex = k;
    };

    Neuron.prototype.input = function(name, value)
    {
        this.inputs[name] += value;
        this.evaluate();
    };

    Neuron.prototype.evaluate = function()
    {

    }







});
