<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
};
</script>

<table border="1">
<caption>
    Rental price
</caption>
<thead>
    <tr>
        <td></td>
        <th id="small" scope="col">
            Small car
        </th>
        <th id="big" scope="col">
            Big Car
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <th id="paris" class="span" colspan="3" scope="colgroup">
            Paris
        </th>
        </tr>
        <tr>
        <th headers="paris" id="day1">
            1 day
        </th>
        <td headers="paris day1 big"> <!-- Noncompliant, referencing the column "big" instead of "small" -->
            11 euros
        </td>
        <td headers="berlin day1 big"> <!-- Noncompliant, there is no header with id "berlin" -->
            50 euros
        </td>
        </tr>
    </tr>
</tbody>
</table>
<table border="1">
<caption>
    Rental price
</caption>
<thead>
    <tr>
        <td></td>
        <th id="small" scope="col">
            Small car
        </th>
        <th id="big" scope="col">
            Big Car
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <th id="paris" class="span" colspan="3" scope="colgroup">
            Paris
        </th>
        </tr>
        <tr>
        <th headers="paris" id="day1">
            1 day
        </th>
        <td headers="paris day1 big"> <!-- Noncompliant, referencing the column "big" instead of "small" -->
            11 euros
        </td>
        <td headers="berlin day1 big"> <!-- Noncompliant, there is no header with id "berlin" -->
            50 euros
        </td>
        </tr>
    </tr>
</tbody>
</table>
<table border="1">
<caption>
    Rental price
</caption>
<thead>
    <tr>
        <td></td>
        <th id="small" scope="col">
            Small car
        </th>
        <th id="big" scope="col">
            Big Car
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <th id="paris" class="span" colspan="3" scope="colgroup">
            Paris
        </th>
        </tr>
        <tr>
        <th headers="paris" id="day1">
            1 day
        </th>
        <td headers="paris day1 big"> <!-- Noncompliant, referencing the column "big" instead of "small" -->
            11 euros
        </td>
        <td headers="berlin day1 big"> <!-- Noncompliant, there is no header with id "berlin" -->
            50 euros
        </td>
        </tr>
    </tr>
</tbody>
</table>
<table border="1">
<caption>
    Rental price
</caption>
<thead>
    <tr>
        <td></td>
        <th id="small" scope="col">
            Small car
        </th>
        <th id="big" scope="col">
            Big Car
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <th id="paris" class="span" colspan="3" scope="colgroup">
            Paris
        </th>
        </tr>
        <tr>
        <th headers="paris" id="day1">
            1 day
        </th>
        <td headers="paris day1 big"> <!-- Noncompliant, referencing the column "big" instead of "small" -->
            11 euros
        </td>
        <td headers="berlin day1 big"> <!-- Noncompliant, there is no header with id "berlin" -->
            50 euros
        </td>
        </tr>
    </tr>
</tbody>
</table>
<table border="1">
<caption>
    Rental price
</caption>
<thead>
    <tr>
        <td></td>
        <th id="small" scope="col">
            Small car
        </th>
        <th id="big" scope="col">
            Big Car
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <th id="paris" class="span" colspan="3" scope="colgroup">
            Paris
        </th>
        </tr>
        <tr>
        <th headers="paris" id="day1">
            1 day
        </th>
        <td headers="paris day1 big"> <!-- Noncompliant, referencing the column "big" instead of "small" -->
            11 euros
        </td>
        <td headers="berlin day1 big"> <!-- Noncompliant, there is no header with id "berlin" -->
            50 euros
        </td>
        </tr>
    </tr>
</tbody>
</table>

<style scoped>
.hello {
  text-align: center;
}
</style>
