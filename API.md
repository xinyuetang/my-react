# API Documentation

## User

###### URL

>/user/login

###### Description

> 获取制定项目的分类信息

###### FORMAT

> JSON

###### HTTP request method

> GET

###### request parameters

|param        |type     |description|
|:-----       |:------- |:----------|
|studentID    |string   |           |
|password     |string   |           |

###### response
|返回字段|字段类型|说明                              |
|:-----   |:------|:-----------------------------  |
|result   |int    |返回结果状态。0：正常；1：错误。   |
|token    |string | 所属公司名                      |
|name     |string |所属类型                         |

***

###### URL
>/user/add

###### Description
> 获取制定项目的分类信息
###### FORMAT
> JSON

###### HTTP request method
> GET

###### request parameters
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                               |
|name    |ture    |string|请求的项目名                          |
|type    |true    |int   |请求项目的类型。1：类型一；2：类型二 。|

###### response
|返回字段|字段类型|说明                              |
|:-----   |:------|:-----------------------------   |
|status   |int    |返回结果状态。0：正常；1：错误。   |
|company  |string | 所属公司名                      |
|category |string |所属类型                         |
