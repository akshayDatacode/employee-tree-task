export const getOrgData = (Employees) => {

  let data = Employees.map(employee => employee = { ...employee, children: [] })
  let l1 = data.filter(d => d.role === 'admin')

  for (let i = 0; i < l1.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j].line_manager === l1[i].name)
        l1[i].children.push(data[j])
    }
  }



  for (let i = 0; i < l1.length; i++) {
    let temp = []
    for (let j = 0; j < l1[i].children.length; j++) {
      for (let k = 0; k < data.length; k++) {
        if (data[k].line_manager === l1[i].children[j].name)
          l1[i].children[j].children.push(data[k])
      }
    }
  }


  for (let i = 0; i < l1.length; i++) {
    for (let j = 0; j < l1[i].children.length; j++) {
      for (let k = 0; k < l1[i].children[j].children.length; k++) {
        for (let l = 0; l < data.length; l++) {
          if (data[l].line_manager === l1[i].children[j].children[k].name)
            l1[i].children[j].children[k].children.push(data[l])
        }
      }
    }
  }

  return l1
}