<template>
  <div>
    <div class="row">
      <div v-if="editable" class="col-md-8">
        <label>Letra y acordes</label>
        <textarea
          class="form-control"
          :value="value"
          rows="15"
          v-on:input="$emit('input', $event.target.value)"
        ></textarea>
      </div>
      <div class="col-md-8 mt-4" id="show-content" v-else>
        <pre>{{ value }}</pre>
      </div>
      <div class="col-md-4">
        <select class="form-control mt-4" v-model="currentInstrument">
          <option v-for="inst in instruments" :value="inst" :key="inst.name">
            {{ inst.name }}
          </option>
        </select>
        <div class="mt-4">Acordes</div>
        <div id="diagrams" class="row">
          <div v-for="chord in chords" class="col-md-6" :key="chord.symbol">
            <div>{{ chord.symbol }} {{ chord.description }}</div>
            <chord
              :setup="{
                startAt: chord.startsAt, // position to start the chord at
                tuning: currentInstrument.stringConf, // tuning
                strings: chord.preparedChord,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import { findGuitarChord } from "chord-fingering";
import { Chords } from "momo-chords";

// import the module
import VcChordDiagram from "vc-chord-diagram";
// import the stylesheet

function constructFromPositionString(positionString) {
  let arrayOfPositions = positionString.split("-");
  if (arrayOfPositions.length == 1) {
    arrayOfPositions = positionString.split("");
  }

  return arrayOfPositions.map((pos, index) => {
    if (pos === "x") {
      return {
        fret: 0,
        finger: "x",
      };
    } else {
      return {
        fret: parseInt(pos),
      };
    }
  });
}
export default {
  components: {
    chord: VcChordDiagram,
  },
  data() {
    return {
      instruments: [
        {
          name: "Guitarra",
          stringConf: ["E", "A", "D", "G", "B", "E"],
        },
        {
          name: "Charango",
          stringConf: ["G", "C", "E", "A", "E"],
        },
      ],
      currentInstrument: null,
      chords: [],
    };
  },
  props: ["value", "mode"],
  watch: {
    value() {
      this.refreshChords();
    },
    currentInstrument() {
      this.refreshChords();
    },
  },
  mounted() {
    this.currentInstrument = this.instruments[0];
    this.refreshChords();
  },

  computed: {
    editable() {
      return ["add", "edit"].includes(this.mode);
    },
  },
  methods: {
    getStartsAt(preparedChord) {
      console.log(preparedChord.map(p => p.fret))
      const frets = preparedChord.map(p => p.fret);
      const min = Math.min(...frets);

      return (min == 0 ? 1 : min);
    },
    refreshChords() {
      const chords = new Chords();

      const words = this.value.replace(/\s+/g, " ").split(" ");

      const songChords = words.filter((word) => chords.isChord(word));
      const uniqueChords = songChords.filter(function (item, pos) {
        return songChords.indexOf(item) == pos;
      });

      this.chords = uniqueChords
        .map((chord) => {
          return findGuitarChord(chord, this.currentInstrument.stringConf);
        })
        .map((chord) => {
          console.log(chord.fingerings);
          return {
            ...chord,
            preparedChord: constructFromPositionString(
              chord.fingerings[0].positionString
            ),
          };
        })
        .map((chord) => {
          console.log("first prepared!", chord.preparedChord.map(c => c.fret));
          const min = Math.min(...(chord.preparedChord.filter(p => p.finger !== 'x').map(p => { return p.fret})));
          return {
            ...chord,
            startsAt: (min == 0 ? 1 : min)
          }
        })
        .map(chord => {
          if (chord.startsAt !== 1) {
            console.log("PREPARED", chord.preparedChord)
            chord.preparedChord = chord.preparedChord.map(prep => {
              if (prep.fret !== 0 && prep.finger !== 'x') {
                return {fret: prep.fret - chord.startsAt + 1, finger: prep.finger};
              } else {
                return {fret: prep.fret, finger: prep.finger};
              }
            });
          }
          console.log(chord)
          return chord;
        });
      // console.log(uniqueChords);
      console.log(this.chords);
      // constructFromPositionString(this.chords[0].fingerings[0].positionString);
      // console.log(chord.fingerings[0].positionString);
    },
  },
};
</script>
<style scoped>
textarea,
#show-content {
  font-family: "Courier New", Courier, monospace;
  font-size: 15px;
}
</style>