---
title: "Updating the primary key in Postgres table"
date: '2023-08-08'
status: 'completed'
language: SQL
---

## Introduction

I am currently building a data model on Hasura. Hasura offers GraphQL Apis for your `SQL` databases. I used the free Neon one, which works quite well. You can use the console or run raw `SQL` queries like a `SQL` warrior.

I was moving quite well with the playground until an issue happened. 

The primary key for my `product` table is an `int` type that auto-increments and is unique. The issue that causes is: when you delete an item from the table, the `id's of subsequent rows don't update.

After deleting the product with the `id "of 1, the next product didn't inherit that `id`. 

This was a pickle and something I desperately wanted to solve. After googling around a bit, I found the solution on this [stackoverflow post.](https://stackoverflow.com/questions/15526813/restart-primary-key-numbers-of-existing-rows-after-deleting-most-of-a-big-table)

```SQL
  alter table product drop constraint product_pkey;
  create temporary sequence temp_seq;
  update product;
  set id = nextval('temp-seq');
  alter table product add primary key (id);
  drop sequence temp-seq;
```

I tried running all of that simultaneously with semicolons at the end, and it failed. Honestly, I am just a couple of days into Postgres and thought that would work because Hasura did say:

> Multiple SQL statements can be separated by semicolons; however, only the result of the last SQL statement will be returned.

I could not be reading it well because it is 2 am, after all.

After running the instructions line by line, I got the `id` to reset how I wanted it.

## Conclusion

I am positively enjoying databases and hope to explore and build more on this rudimentary knowledge.

Thanks for reading.