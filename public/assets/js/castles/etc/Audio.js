/**
 * Created by ndario on 4/26/15.
 */

define(function(){

    var Audio = function(config)
    {
        this.audio_id = config['audio_id'] != null ? config['audio_id'] : 'audio';
        this.audio_file = '';
        this.audioCtx = null;
        this.audioSource = null;
        this.audioAnalyser = null;
        this.audioBufferLength = 0;
        this.audioDataArray = null;
        this.samplesize = config['samplesize'] != null ? config['samplesize'] : 512;
    };

    Audio.prototype.initAudioWithFreq = function()
    {
        try{
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
        } catch(e){
            console.log('web audio is not supported by this browser');
            return false;
        }

        this.audio_file = document.getElementById(this.audio_id);
        this.audioSource = this.audioCtx.createMediaElementSource(this.audio_file);
        this.audioAnalyser = this.audioCtx.createAnalyser();
        this.audioSource.connect(this.audioAnalyser);


        this.audioGain = this.audioCtx.createGain();
        this.audioSource.connect(this.audioGain);
        this.audioGain.connect(this.audioCtx.destination);

        this.audioAnalyser.fftSize = this.samplesize;

        this.audioBufferLength = this.audioAnalyser.frequencyBinCount;
        this.audioDataArray = new Uint8Array(this.audioBufferLength);
        this.audioAnalyser.getByteFrequencyData(this.audioDataArray);
    };

    Audio.prototype.onFin = function(funct)
    {
        var that = this;
        $(document.getElementById(this.audio_id)).on('ended', funct.bind(that));
    };

    Audio.prototype.cleanupAudioWithFreq = function()
    {
        //this.audioCtx.close(); // Not yet implemented to release source nodes
        var temp = $(this.audio_file);
        $(this.audio_file).remove();
        this.audioCtx = null;

    };


    return Audio;
});
