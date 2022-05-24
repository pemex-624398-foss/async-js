<template>
  <v-row>
    <v-col>
      <v-card>
        <v-toolbar color="secondary" dark flat>
          <v-toolbar-title>Calculadora</v-toolbar-title>
        </v-toolbar>
        <v-container class="pt-10 px-10">
          <calculator-field-set
            :operation.sync="calculateCommand.argument.operation"
            :operand1.sync="calculateCommand.argument.operand1"
            :operand2.sync="calculateCommand.argument.operand2"
            :result="result"
            :result-decimals.sync="resultDecimals"
            :max-result-decimals="maxResultDecimals"
            @calculate="calculate"
          ></calculator-field-set>
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
import { Component, Vue, Watch } from "vue-property-decorator";
import Heading from "@/components/Heading.vue";
import CalculateCommand from "@/core/use-cases/calculator/calculate-command";
import CalculatorFieldSet from "@/components/calculator/CalculatorFieldSet.vue";

@Component({
  name: "Example1",
  components: { CalculatorFieldSet, Heading }
})
export default class Example1 extends Vue {
  // Data
  protected calculateCommand = new CalculateCommand();
  protected result = 0;
  protected maxResultDecimals = 6;
  protected resultDecimals = this.maxResultDecimals;
  protected error: any = null;

  // Watch
  @Watch("resultDecimals")
  onResultDecimalsChanged() {
    this.formatResult();
  }

  // Methods
  calculate() {
    this.error = null;

    this.calculateCommand.execute((error) => {
      if (error) {
        this.error = error;
        this.result = NaN;
        return;
      }

      this.formatResult();
    });
  }

  formatResult() {
    this.result = Number(
      this.calculateCommand.result?.toFixed(this.resultDecimals)
    );
  }
}
</script>
