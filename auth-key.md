1. agents  查看代办员
```
[post]/agents/search
[get]/agents/{agentId}
[post]/agents/export
```
2. wages-base  核算代办员代办费
```
[post]/wages/import-excel
[post]/wages/checking
```
3. wages-bonus  核算代办员奖金
```
[post]/wages/import-excel
[post]/wages/checking
```
4. wages-partner  核算合伙人代办费
```
[post]/wages/import-excel
[post]/wages/checking
```
5. wages-detail 查看工资明细
```
[post]/wages/agents-partner-search
[post]/wages/agents-bonus-search
[post]/wages/agents-base-search
[get]/wages/export
```
6. wages-approve  审批工资
    - wages-approve-clean   清除审批（未提交审批）
    - wages-approve-submit   提交审批（未提交审批）
    - wages-approve-cancel   撤销审批（待审批）
    - wages-approve-done     通过审批（待审批）
    - wages-approve-reject   驳回审批（待审批）
    ```
    [post]/wages/search
    [post]/wages/approval
    ```
7. wages-standard  工资核算标准
    - wages-standard-edit  设置／编辑／保存
    ```
    [get]/wages/get-agents-standard
    [get]/wages/get-partner-standard
    [post]/wages/set-agents-standard
    ```
8. statements  回款流水
```
[post]/turnovers/flow/search
```
9. day-turnovers  日回款额汇总
```
[post]/turnovers/search/day
```
10. month-turnovers  月回款额汇总
```
[post]/turnovers/search/month
```
11. electricity-bills  缴电费记录
```
[post]/payments/electric/search
```
12. phone-bills  缴话费记录
```
[post]/payments/phone/search
```
13. card-bills  卡回款记录
```
[post]/payments/card/search
[get]/payments/export
```
