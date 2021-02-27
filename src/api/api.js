const options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8', 
  },
  method: 'GET',
}

export function fetchChildren(parentId) {
  const url = `http://localhost:3001/children/${parentId}`;

  return fetch(url, options)
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw Error(res.statusText)
    }
  })
  .catch(err => console.log('the error',err))
}

export function fetchSearch(searchString) {
  const url = `http://localhost:3001/search?q=${searchString}`;

  return fetch(url, options)
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw Error(res.statusText)
    }
  })
  .catch(err => console.log('the error',err))
}

/*
 
*/

export function fetchSponsored(data, query) {
  const deptId = data[0].dept ? data[0].dept : '';
  const itemsType = data[0].type ? data[0].type : '';
  query = query ? query : '';
  const url = `http://localhost:3001/search?q=${query}&sale=1&dept=${deptId}&type=${itemsType}`
  console.log('sponsored url',url)
  return fetch(url, options)
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw Error(res.statusText)
    }
  })
  .catch(err => console.log('the error',err))    

}
