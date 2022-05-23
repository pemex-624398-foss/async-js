<template>
  <v-row>
    <v-col>
      <v-card>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="a"
                type="number"
                label="A"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="operation"
                :items="operations"
                label="Operación"
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="b"
                type="number"
                label="B"
                outlined
              ></v-text-field>
            </v-col>
            <v-col class="shrink">
              <v-btn color="accent" x-large block @click="execute">=</v-btn>
            </v-col>
            <v-col>
              <v-text-field
                v-model="result"
                type="number"
                readonly
                label="Resultado"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="error">
            <v-col>
              <v-alert type="error" color="error" border="bottom">
                {{ error.message }}
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Heading from "@/components/Heading.vue";
import DataRecordList from "@/components/DataRecordList.vue";
import CalculatorOperation from "@/core/model/calculator-operation";
import CalculateCommand from "@/core/use-cases/calculate-command";
import CalculationError from "@/core/model/calculation-error";

@Component({
  name: "Example1",
  components: { DataRecordList, Heading }
})
export default class Example1 extends Vue {
  // Data
  protected a: string | null = null;
  protected b: string | null = null;
  protected operations: Array<{ value: CalculatorOperation; text: string }> =
    [];
  protected operation: CalculatorOperation | null = null;
  protected result: number | null = null;
  protected error: CalculationError | any | null = null;
  protected command = new CalculateCommand();

  // Methods
  execute() {
    const { a, b, operation } = this;
    if (!operation) return;

    this.error = null;

    this.command.execute(
      {
        a: Number(a),
        b: Number(b),
        operation
      },
      (error, result) => {
        if (error) {
          this.error = error;
          return;
        }

        this.result = result || null;
      }
    );
  }

  // Hooks
  mounted() {
    this.operations.push(
      {
        value: CalculatorOperation.Addition,
        text: "Suma"
      },
      {
        value: CalculatorOperation.Subtraction,
        text: "Resta"
      },
      {
        value: CalculatorOperation.Multiplication,
        text: "Multiplicación"
      },
      {
        value: CalculatorOperation.Division,
        text: "División"
      }
    );
    this.operation = CalculatorOperation.Addition;
  }
}
</script>
