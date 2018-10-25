<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem label="代理ID" :label-width="80">
          <Input v-model="searchedAgentId" placeholder="代理ID" :maxlength="6" clearable style="width: 10em;"/>
        </FormItem>


        <FormItem :label-width="0"> <Button type="primary" @click="handleSearchAgent" style="margin-right: 10px;">查询</Button></FormItem>
        </FormItem>
      </Form>

    </div>
    <div style="margin-top: 10px;">
      <div v-if="isShowingAgentWithoutIndividualRebateRatio" style="color: red;">该代理尚未被授予独立返利比例：</div>
      <div v-else>被授予独立返利比例的代理：</div>
    </div>
    <Table :columns="tableColumns" :data="tableRows" border>
    </Table>
  </div>
</template>
<style>
  @import "../../assets/style/common.css";
</style>
<script>
  export default {
    data() {
      return {
        tableColumns: [
          { title: "游戏内id", key: "id", align: "center", width: 100 },
          { title: "名称", key: "name", align: "center", width: 150 },
          {
            title: "头像",
            key: "avatar",
            align: "center",
            width: 80,
            render: (h, params) => {
              if (params.row.avatar.indexOf("http://") == -1 && params.row.avatar.indexOf("https://") == -1) {
                return h("div", "");
              } else {
                return h("img", {
                  attrs: {
                    src: params.row.avatar
                  },
                  style: {
                    width: "40px",
                    height: "40px",
                    "border-radius": "5px",
                    "margin-top": "5px"
                  }
                });
              }
            }
          },
          { title: "所属商务", key: "commerceName", align: "center", width: 100 },
          { title: "代理等级", key: "agentLevelName", align: "center", width: 100 },
          {
            title: "直属返利比例",
            key: "directRebateRatio",
            align: "center",
            width: 120,
            render: (h, params) => {
              if (params.row.isBeingEdited) {
                return h("InputNumber", {
                  props: {
                    value: params.row.directRebateRatioInputValue,
                    step: 0.01,
                    min: 0,
                    max: 1,
                    formatter: value => `${(100 * value).toFixed(0)}%`,
                    parser: value => (0.01 * value.replace("%", "")).toFixed(2)
                  },
                  on: {
                    "on-change": newValue => {
                      params.row.directRebateRatioInputValue = newValue;
                    }
                  }
                });
              } else {
                return h("div", (100 * params.row.directRebateRatio).toFixed(0) + "%");
              }
            }
          },
          {
            title: "下级返利比例",
            key: "subordinateRebateRatio",
            align: "center",
            width: 120,
            render: (h, params) => {
              if (params.row.isBeingEdited) {
                return h("InputNumber", {
                  props: {
                    value: params.row.subordinateRebateRatioInputValue,
                    step: 0.01,
                    min: 0,
                    max: 1,
                    formatter: value => `${(100 * value).toFixed(0)}%`,
                    parser: value => (0.01 * value.replace("%", "")).toFixed(2)
                  },
                  on: {
                    "on-change": newValue => {
                      params.row.subordinateRebateRatioInputValue = newValue;
                    }
                  }
                });
              } else {
                return h("div", (100 * params.row.subordinateRebateRatio).toFixed(0) + "%");
              }
            }
          },
          {
            title: "操作",
            key: "action",
            render: (h, params) => {
              if (params.row.isBeingEdited) {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.submitRowChange(params.row);
                        }
                      }
                    },
                    "确定"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "error"
                      },
                      on: {
                        click: () => {
                          this.cancelRowChange(params.index);
                        }
                      }
                    },
                    "取消"
                  )
                ]);
              } else if (params.row.hasIndividualRebateRatio) {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.beginChangeRow(params.index);
                        }
                      }
                    },
                    "调整独立返利比例"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "error"
                      },
                      on: {
                        click: () => {
                          this.onClickIndividualRebateRatioCancelBtn(params.row);
                        }
                      }
                    },
                    "取消独立返利比例"
                  )
                ]);
              } else {
                return h("Button", {
                  props: {
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.beginChangeRow(params.index);
                    }
                  }
                }, "授予独立返利比例");
              }
            }
          }
        ],
        tableRows: [],
        searchedAgentId: "",
        beingEditedRowIndex: -1,
        isShowingAgentWithoutIndividualRebateRatio: false,
        latestSearch: null,
      };
    },

    created() {
      this.queryAllAgentsWithIndividualRebateRatio();
    },

    methods: {
      handleSearchAgent() {
        var isSearchingAllAgents = this.searchedAgentId.trim().length == 0;

        if (isSearchingAllAgents) {
          this.queryAllAgentsWithIndividualRebateRatio();
        } else {
          var agentId = parseInt(this.searchedAgentId.trim());
          if (isNaN(agentId) || agentId <= 0) {
            this.$Message.error("请正确输入代理id");
            return;
          }

          this.queryAgentRebateRatioInfo(agentId);
        }
      },

      queryAllAgentsWithIndividualRebateRatio() {
        // 清空table
        this.tableRows = [];
        this.isShowingAgentWithoutIndividualRebateRatio = false;

        this.$http.post(global.url.query_agents_individual_rebate_ratio_info, {}).then(records => {
          if (!records) {
            return;
          }

          for (var i = 0; i < records.length; i++) {
            this.tableRows.push({
              id: records[i].agent_id,
              name: records[i].name,
              avatar: records[i].avatar,
              commerceId: records[i].commerce_id,
              commerceName: records[i].commerce_name,
              directRebateRatio: records[i].direct_rebate_ratio,
              subordinateRebateRatio: records[i].subordinate_rebate_ratio,
              hasIndividualRebateRatio: (records[i].has_individual_rebate_ratio == 1),
              agentLevelName: this.getAgentLevelNameByLevel(records[i].agent_level),
              directRebateRatioInputValue: 0,
              subordinateRebateRatioInputValue: 0,
              isBeingEdited: false,
            });
          }
        });

        // 保存本次查询
        this.latestSearch = () => { this.queryAllAgentsWithIndividualRebateRatio(); };
      },

      queryAgentRebateRatioInfo(agentId) {
        // 清空table
        this.tableRows = [];
        this.isShowingAgentWithoutIndividualRebateRatio = false;

        this.$http
          .post(global.url.query_agent_individual_rebate_ratio_info, {
            agentId: agentId
          })
          .then(record => {
            if (!record) {
              return;
            }

            if (record.err_code != 0) {
              this.$Message.error(record.err_msg);
              return;
            }

            this.tableRows.push({
              id: record.agent_id,
              name: record.name,
              avatar: record.avatar,
              commerceId: record.commerce_id,
              commerceName: record.commerce_name,
              directRebateRatio: record.direct_rebate_ratio,
              subordinateRebateRatio: record.subordinate_rebate_ratio,
              hasIndividualRebateRatio: (record.has_individual_rebate_ratio == 1),
              agentLevelName: this.getAgentLevelNameByLevel(record.agent_level),
              directRebateRatioInputValue: 0,
              subordinateRebateRatioInputValue: 0,
              isBeingEdited: false,
            });

            this.isShowingAgentWithoutIndividualRebateRatio = (record.has_individual_rebate_ratio == 0);
          });

        // 保存本次查询
        this.latestSearch = () => { this.queryAgentRebateRatioInfo(agentId); };
      },

      submitRowChange(row) {
        this.$http.post(global.url.update_agent_individual_rebate_ratio_info, {
          agentId: row.id,
          directRebateRatio: row.directRebateRatioInputValue,
          subordinateRebateRatio: row.subordinateRebateRatioInputValue
        }).then(record => {
          if (!record) {
            return;
          }

          if (record.err_code != 0) {
            this.$Message.error(record.err_msg);
          } else {
            this.$Message.info("操作成功");
            row.isBeingEdited = false;

            // 自动执行查询以刷新页面数据
            this.latestSearch();
          }
        });
      },

      cancelRowChange(index) {
        this.tableRows[index].isBeingEdited = false;
        this.beingEditedRowIndex = -1;
      },

      beginChangeRow(index) {
        if (this.beingEditedRowIndex >= 0) {
          this.cancelRowChange(this.beingEditedRowIndex);
        }

        this.tableRows[index].isBeingEdited = true;
        this.beingEditedRowIndex = index;
        this.tableRows[index].directRebateRatioInputValue = this.tableRows[index].directRebateRatio;
        this.tableRows[index].subordinateRebateRatioInputValue = this.tableRows[index].subordinateRebateRatio;
      },

      onClickIndividualRebateRatioCancelBtn(row) {
        this.$Modal.confirm({
          content: `<p>即将取消代理【${row.name}】的独立返利比例</p><p>取消后，该代理的返利比例将会是与其等级对应的默认值</p>`,
          onOk: () => {
            this.cancelIndividualRebateRatio(row.id);
          }
        });
      },

      cancelIndividualRebateRatio(agentId) {
        this.$http.post(global.url.cancel_agent_individual_rebate_ratio, {
          agentId: agentId
        }).then(record => {
          if (!record) {
            return;
          }

          if (record.err_code != 0) {
            this.$Message.error(record.err_msg);
          } else {
            this.$Message.info("操作成功");

            // 自动执行查询以刷新页面数据
            this.latestSearch();
          }
        });
      },

      getAgentLevelNameByLevel(level) {
        switch (level.toString()) {
          case '1':
            return "预备代理"
          case '2':
            return "普通代理"
          case '3':
            return "铜牌代理"
          case '4':
            return "银牌代理"
          case '5':
            return "金牌代理"
          default:
            return "";
        }
      }
    }
  };
</script>
