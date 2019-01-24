<template>
  <div id="TemplateSetting" class="changeLog" v-loading="loading" element-loading-text="Loading...">
    <div class="CommentContainer" id="resetTableTemplate">
      <div class=" CommentTable NotDifferentBg MessageTable">
        <div class="batch filterDiv">
          <el-select v-model="params.ViewTemplateId" placeholder="Choose a template" @change="changeSelect"
                     style="width:200px;margin-right:16px;height:32px">
            <el-option v-for="item in templates" :key="item.Id" :label="item.Name"
                       :value="item.Id"></el-option>
          </el-select>
          <el-button class="SignUpBtn" @click="ConfirmBtn">Save</el-button>
        </div>
        <template>
          <el-table
            v-if="tableShow"
            stripe
            border
            ref="table"
            :data="tableData"
            tooltip-effect="dark"
            align="left"
            style="width: 50%"
            @select="handleSelect">
            <el-table-column fixed="left" type="selection"></el-table-column>
            <el-table-column label="Operation">
              <el-table-column label="Order" :resizable="false" width="186">
                <template slot-scope="scope">
                  <div class="resetInputSpan">
                    <el-input
                      @change="testNumber(scope.$index,scope.row.num)"
                      v-model.number="scope.row.num"
                      :disabled="scope.row.IsChecked!==1">
                    </el-input>
                  </div>
                  <div class="arrowIcons" :class="{disabledToggle:scope.row.IsChecked!==1}"
                       style="display: inline-block">
                    <el-tooltip content="Up" placement="top">
                                            <span class="btnUp" :class="{disabled:scope.$index===0}"
                                                  @click="clickUp(scope.$index,scope.row.Id,scope.row.IsChecked)">
                                                 <i aria-hidden="true" class="fa fa-arrow-up"></i>
                                            </span>
                    </el-tooltip>
                    <el-tooltip content="Down" placement="top">
                                            <span class="btnDown"
                                                  :class="{disabled:scope.$index===(tableData.length-1)}"
                                                  @click="clickDown(scope.$index,scope.row.Id,scope.row.IsChecked)">
                                                 <i aria-hidden="true" class="fa fa-arrow-down"></i>
                                            </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="IsChecked" label="Filter" width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.DicUrl!=null &&scope.row.DicUrl!==''  && scope.row.IsChecked===1"
                       :class="{disabledToggle:scope.row.IsChecked!==1}">
                    <el-tooltip :content="scope.row.FilterId===0 ? 'Off' :'On' " placement="top">
                                             <span class="btnOff" v-if="scope.row.FilterId===0"
                                                   @click="toggleSelect(1,scope.$index)">
                                                 <i aria-hidden="true" class="fa fa-filter"></i>
                                            </span>
                      <span class="btnOn" v-if="scope.row.FilterId===1"
                            @click="toggleSelect(0,scope.$index)">
                                                 <i aria-hidden="true" class="fa fa-filter"></i>
                                            </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="LockId" label="Fixed" width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.IsChecked===1"
                       :class="{disabledToggle:scope.row.IsChecked!==1}">
                    <el-tooltip :content="scope.row.LockId===0 ? 'Off' :'On'" placement="top">
                                             <span class="btnOff" v-if="scope.row.LockId===0"
                                                   @click="toggleFixed(1,scope.$index)">
                                                 <i class="fa fa-lock " aria-hidden="true"></i>
                                            </span>
                      <span class="btnOn" v-if="scope.row.LockId===1"
                            @click="toggleFixed(0,scope.$index)">
                                                 <i aria-hidden="true" class="fa fa-lock"></i>
                                            </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column prop="DisplayPropertyName" label="Field"></el-table-column>
            <el-table-column prop="Width" label="Width">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.Width" :disabled="scope.row.IsChecked!==1"
                          @change="testNumber2(scope.$index,scope.row.num)"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { HomeApi } from '../api'
export default {
  data () {
    return {
      currIndex: '',
      currVal: '',
      loading: true,
      numbers: '',
      valueChange: '',
      num: 0,
      tableShow: false,
      dialogFormVisible: false,
      maxHeight: 200,
      templates: [],
      checkedCities1: [],
      multipleSelection2: [],
      params: {
        ViewTemplateId: '',
        H6ViewInputList: []
      },
      checkedTemplate: [],
      tableData: []
    }
  },
  mounted () {
    this.GetSystemViewTemplates()
  },
  methods: {
    async GetSystemViewTemplates () {
      let res = await HomeApi.GetSystemViewTemplates({})
      if (res.data.Success) {
        this.templates = res.data.Data
        this.params.ViewTemplateId = res.data.Data[0].Id
        this.tableList()
      }
    },
    clickDown (index, id, IsChecked) {
      if (this.params.H6ViewInputList !== [] && this.params.H6ViewInputList !== '' && this.params.H6ViewInputList !== undefined) {
        if (IsChecked === 1) {
          if (this.tableData[index].LockId === this.tableData[index + 1].LockId) {
            let currDown = this.tableData[index + 1]
            if (currDown.IsChecked === 1) {
              this.loading = true
              let currData = this.tableData[index]
              this.tableData.splice(index, 1, currDown)
              this.tableData.splice(index + 1, 1, currData)
              this.tableData.forEach((el, index) => {
                el.num = (index + 1)
              })
              this.getCheckedData()
              this.$nextTick(() => {
                this.loading = false
              })
            }
          }
        }
      }
    },
    clickUp (index, id, IsChecked) {
      if (this.params.H6ViewInputList !== [] && this.params.H6ViewInputList !== '' && this.params.H6ViewInputList !== undefined) {
        if (IsChecked === 1) {
          if (this.tableData[index].LockId === this.tableData[index - 1].LockId) { // 上一个数据和当前数据的lockid是否一样
            this.loading = true
            let currData = this.tableData[index]
            this.tableData.splice(index, 1)
            this.tableData.splice(index - 1, 0, currData)
            this.tableData.forEach((el, index) => {
              el.num = (index + 1)
            })
            this.getCheckedData()
            this.$nextTick(() => {
              this.loading = false
            })
          }
        }
      }
    },
    defaultSlected () {
      if (this.tableData !== [] && this.tableData !== null && this.tableData !== undefined) {
        this.params.H6ViewInputList = []
        this.tableData.forEach(el => {
          if (el.IsChecked === 1) {
            this.$refs.table.toggleRowSelection(el)
            this.params.H6ViewInputList.push(el)
          }
        })
      }
      this.loading = false
      this.numbers = ''
    },
    getCheckedData () {
      this.params.H6ViewInputList = []
      this.tableData.forEach((el) => {
        if (el.IsChecked === 1) {
          this.params.H6ViewInputList.push(el)
        }
      })
      this.numbers = ''
      this.loading = false
    },
    testNumber (index, val) {
      this.numbers = /^[1-9]+\d*$/.test(val) ? val : ''
      this.changeNumber(index, val)
    },
    testNumber2 (index, val) {
      // LockId
      if (typeof (val) !== 'number') {
        this.$message.error('Please enter a number')
      } else {
        this.loading = true
        this.tableShow = false
        let currData = this.tableData[index]
        this.tableData.splice(index, 1)
        this.tableData.splice(index, 0, currData)
        this.$nextTick(() => {
          this.tableShow = true
          this.defaultSlected()
        })
      }
    },
    changeNumber (index, val) {
      // LockId
      if (this.numbers === '') {
        this.$message.error('Please enter a number')
      } else if (this.numbers > this.tableData.length) {
        this.$message.error('The sorting number must be in the selected range')
      } else if (this.tableData[index].LockId === this.tableData[val - 1].LockId) {
        let num = 0
        this.tableData.forEach((el) => {
          if (el.IsChecked === 1) {
            num = num + 1
          }
        })
        if ((this.numbers > num)) {
          this.$message.error('The sorting number must be in the selected range')
        } else {
          this.loading = true
          this.tableShow = false
          let currData = this.tableData[index]
          this.tableData.splice(index, 1)
          this.tableData.splice(this.numbers - 1, 0, currData)
          this.tableData.forEach((el, index) => {
            el.num = 0
            el.num = (index + 1)
          })
          this.$nextTick(() => {
            this.tableShow = true
            this.defaultSlected()
          })
        }
      } else {
        this.loading = false
        this.tableShow = true
      }
    },

    async ConfirmBtn () {
      if (this.params.H6ViewInputList.length === 0) {
        this.$message.warning('Please Select')
        return
      }
      let num = 0
      this.params.H6ViewInputList = []
      this.tableData.forEach((el, index) => {
        if (el.IsChecked === 1) {
          num++
          let obj = {}
          obj.FilterId = el.FilterId
          obj.LockId = el.LockId
          obj.PropertyId = el.Id
          obj.Sequence = num
          obj.Width = el.Width
          obj.ViewTemplateId = this.params.ViewTemplateId
          this.params.H6ViewInputList.push(obj)
        }
      })
      this.loading = true
      let res = await HomeApi.SaveView({...this.params})
      if (res.data.Success) {
        this.$message.success('Save Success')
        this.tableList()
      } else {
        this.loading = false
        this.$message.error(res.data.Message)
      }
      this.dialogFormVisible = false
    },
    toggleFixed (toggle, index) {
      if (this.tableData[index].IsChecked === 1) {
        this.loading = true
        let currIndex = 0
        let time = 0
        let currData = this.tableData[index]
        if (toggle === 0) {
          this.tableData.splice(index, 1)
          this.tableData.forEach((el, index1) => {
            if (el.LockId === 0) {
              if (time === 0) {
                time++
                currIndex = index1
                return false
              }
            }
          })
          currData.LockId = toggle
          this.tableData.splice(currIndex, 0, currData)
        } else if (toggle === 1) {
          this.tableData.forEach((el, index2) => {
            if (el.LockId === 0) {
              if (time === 0) {
                time++
                currIndex = index2
                return false
              }
            }
          })
          currData.LockId = toggle
          this.tableData.splice(index, 1)
          if (currIndex === 0) { // 第一个位置
            this.tableData.unshift(currData)
          } else if (currIndex === (this.tableData.length)) {
            this.tableData.push(currData)
          } else {
            this.tableData.splice(currIndex, 0, currData)
          }
        }
        this.tableData.forEach((el, index) => {
          el.num = (index + 1)
        })
        this.$nextTick(() => {
          this.loading = false
        })
      }
    },
    toggleSelect (toggle, index) {
      if (this.tableData[index].IsChecked === 1) {
        this.tableData[index].FilterId = toggle
      }
    },
    handleSelect (val) {
      this.loading = true
      this.params.H6ViewInputList = val
      this.tableData.forEach(el => {
        el.IsChecked = 0
        this.params.H6ViewInputList.forEach(el2 => {
          if (el2.Id === el.Id) {
            el.IsChecked = 1
          }
        })
      })
      let arr = []
      this.tableData.forEach(el => {
        if (el.IsChecked === 1) {
          arr.push(el)
        }
      })
      this.tableData.forEach(el => {
        if (el.IsChecked !== 1) {
          el.IsChecked = 0
          arr.push(el)
        }
      })
      arr.forEach((el, index) => {
        el.num = (index + 1)
      })
      this.tableData = [...arr]
      this.$nextTick(() => {
        this.defaultSlected()
      })
    },
    changeSelect (val) {
      this.loading = true
      this.params.ViewTemplateId = val
      this.tableList()
    },
    async tableList () {
      let res = await HomeApi.GetDataEntityProperty({
        ViewTemplateId: this.params.ViewTemplateId,
        SearchType: 1
      })
      if (res.data.Success) {
        this.tableData = res.data.Data
        this.tableData.forEach((el, index) => {
          el.num = (index + 1)
        })
        this.tableShow = true
      }
      this.$nextTick(() => {
        this.defaultSlected()
      })
    }
  }
}
</script>
