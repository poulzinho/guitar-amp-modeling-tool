'use strict';

angular.module('sebaWebappApp')
  .controller('WebAudioSndfxsCtrl', ['$scope', function ($scope, $document) {

    $scope.turnOnOffWebAudioSndfx = function (sndFilters) {
      if ($scope.onOffValue) {
        $scope.turnOnWebAudioSndfx(sndFilters);
      } else {
        $scope.turnOffWebAudioSndfx();
      }
    }

    $scope.turnOnWebAudioSndfx = function (sndFilters) {
      if ($scope.audioContext == null) {
        navigator.getUserMedia({audio: true},
          function (stream) {
            $scope.audioContext = new AudioContext();
            $scope.microphone = $scope.audioContext.createMediaStreamSource(stream);
            $scope.microphone = $scope.convertToMono($scope.microphone);
            $scope.analyser = $scope.audioContext.createAnalyser();
            $scope.speaker = $scope.audioContext.destination;
            $scope.prepareWebAudioSndfx();
            console.log('Web Audio: STREAMING...');
          }, function (e) {
            alert('Error getting audio');
            // console.log(e);
          });
      }
    }

    $scope.convertToMono = function (input) {
      var splitter = $scope.audioContext.createChannelSplitter(2);
      var merger = $scope.audioContext.createChannelMerger(2);

      input.connect(splitter);
      splitter.connect(merger, 0, 0);
      splitter.connect(merger, 0, 1);
      return merger;
    }

    $scope.turnOffWebAudioSndfx = function () {
      if ($scope.audioContext != null) {
        $scope.audioContext.close();
        $scope.audioContext = null;
        $scope.onOffValue = false;
        console.log('Web Audio: STOPPED!');
      }
    }

    $scope.webAudioCatalog = ['distortion', 'gain', 'delay', 'reverb'];


    $scope.updateWebAudioSndfx = function (sndfxFilter) {

      var currentSndfxFilter = $scope.webAudioSndfxFiltersMap.get(sndfxFilter.timestamp);
      if (currentSndfxFilter != null) {

        var audioNode = currentSndfxFilter.constructor.name;

        switch (audioNode) {
          case 'DelayNode':
            currentSndfxFilter.delayTime.value = (sndfxFilter.value / 100);
            break;
          case 'GainNode': // Volume
            currentSndfxFilter.gain.value = (sndfxFilter.value / 100);
            break;
          case 'WaveSharperNode': // Distortion
            currentSndfxFilter.curve = $scope.makeDistortionCurve(sndfxFilter.value * 4);
            break;
          case 'ConvolverNode': // Reverb
            currentSndfxFilter.buffer =
              $scope.impulseResponse(sndfxFilter.value);
            break;
          default:
            currentSndfxFilter.value = sndfxFilter.value;
            break;
        }

        console.log('Web Audio: SND FILTERS UPDATED');
        $scope.showBarGraph();
      }

    }

    $scope.prepareWebAudioSndfx = function () {

      if ($scope.audioContext == null) {
        console.log('Web Audio: SLEEPING')
        return;
      }

      $scope.webAudioSndfxFiltersMap.clear();
      $scope.microphone.disconnect();

      var audioNode = $scope.audioContext.createGain(1.0); // initial audio feedback
      $scope.microphone.connect(audioNode);
      var sndfxFilterSet = $scope.sndfxData.filters;

      sndfxFilterSet.forEach(function (sndfxFilter) {

        var chosenFilter;

        switch (sndfxFilter.filter) {
          case 'delay':
            var delayNode = $scope.audioContext.createDelay(sndfxFilter.value / 100);
            chosenFilter = delayNode;
            break;
          case 'gain': // Volume
            var gainNode = $scope.audioContext.createGain(sndfxFilter.value / 100);
            chosenFilter = gainNode;
            break;
          case 'distortion':
            var filter = $scope.audioContext.createWaveShaper();
            filter.curve = $scope.makeDistortionCurve(sndfxFilter.value * 4);
            filter.oversample = '4x';
            chosenFilter = filter;
            break;
          case 'reverb':
            chosenFilter = $scope.createReverb(sndfxFilter.value);
            break;
          default:
            var gainNode = $scope.audioContext.createGain(sndfxFilter.value);
            chosenFilter = gainNode;
            break;
        }

        audioNode = audioNode.connect(chosenFilter);
        $scope.webAudioSndfxFiltersMap.set(sndfxFilter.timestamp, chosenFilter);
      });

      audioNode.connect($scope.analyser);
      $scope.analyser.connect($scope.speaker)

      console.log('Web Audio: STARTED!');
      console.log($scope.webAudioSndfxFiltersMap);
      $scope.showBarGraph();

    };

    $scope.showBarGraph = function () {

      d3.select(".pedal-lcd svg").remove();
      var frequencyData = new Uint8Array(25);
      var svgHeight = '230';
      var svgWidth = '170';
      var barPadding = '1';

      $scope.createSvg = function (parent, height, width) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width)
          .attr('class', 'pedal-graph');
      }

      var svg = $scope.createSvg('.current .pedal-lcd', svgHeight, svgWidth);

      // Create our initial D3 chart.
      svg.selectAll('rect')
        .data(frequencyData)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
          return i * (svgWidth / frequencyData.length);
        })
        .attr('width', svgWidth / frequencyData.length - barPadding);

      // Continuously loop and update chart with frequency data.
      $scope.renderChart = function () {
        requestAnimationFrame($scope.renderChart);

        // Copy frequency data to frequencyData array.
        $scope.analyser.getByteFrequencyData(frequencyData);

        // Update d3 chart with new data.
        svg.selectAll('rect')
          .data(frequencyData)
          .attr('y', function (d) {
            return svgHeight - d;
          })
          .attr('height', function (d) {
            return d;
          })
          .attr('fill', function (d) {
            return 'rgb(255, 0, ' + d + ')';
          });
      }

      // Run the loop
      $scope.renderChart();
    }

    $scope.makeDistortionCurve = function (amount) {
      var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
      for (; i < n_samples; ++i) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
      }
      return curve;
    };

    $scope.createReverb = function (value) {
      console.log('reverb');
      var convolver = $scope.audioContext.createConvolver();
      var wetGain = $scope.audioContext.createGain();
      convolver.buffer = $scope.impulseResponse(value); // reverbBuffer;
      convolver.connect(wetGain);
      return convolver;
    }

    $scope.impulseResponse = function (value) {
      var duration = value / 500;
      var decay = value / 1000;
      var reverse = value / 1000;
      console.log('impulse!');
      var sampleRate = $scope.audioContext.sampleRate;
      var length = sampleRate * duration;
      var impulse = $scope.audioContext.createBuffer(2, length, sampleRate);
      var impulseL = impulse.getChannelData(0);
      var impulseR = impulse.getChannelData(1);

      if (!decay)
        decay = 2.0;
      for (var i = 0; i < length; i++) {
        var n = reverse ? length - i : i;
        impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
        impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
      }
      return impulse;
    }

  }]);
