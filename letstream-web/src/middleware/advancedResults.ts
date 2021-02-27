import { Request } from "express";
import {
  LessThan,
  MoreThan,
  MoreThanOrEqual,
  Equal,
  LessThanOrEqual,
  Like,
  In,
} from "typeorm";

export default (req: Request) => {
  //   console.log({ query: req.query });
  // pagination current page
  const page: number = req.query.page && parseInt(req.query.page as string);

  //   pagination size per page
  const pageSize =
    (req.query.pageSize && parseInt(req.query.pageSize as string)) || 10;
  let queryParams: any = {};

  queryParams.take = pageSize;
  queryParams.skip = pageSize * (page - 1);
  queryParams.order = {};
  queryParams.where = {};

  //   where conditions
  const conditionFields = {
    $eq$: Equal,
    $lt$: LessThan,
    $gt$: MoreThan,
    $lte$: LessThanOrEqual,
    $gte$: MoreThanOrEqual,
    $like$: Like,
    $in$: In,
  };
  if (req.query.conditions) {
    const conditions = req.query.conditions as string;
    conditions.split(",").forEach((condition) => {
      Object.keys(conditionFields).forEach((conditionKey) => {
        if (condition.includes(conditionKey)) {
          const [key, value] = condition.split(conditionKey);
          if (conditionKey === "$in$") {
            queryParams.where[key] = conditionFields[conditionKey](
              value.split("-")
            );
          } else {
            queryParams.where[key] = conditionFields[conditionKey](value);
          }
        }
      });
    });
  }

  //   sorting params
  if (req.query.orders) {
    const orders = req.query.orders as string;
    orders.split(",").forEach((sortOrder) => {
      const [key, value] = sortOrder.split("-");
      queryParams.order[key] = value;
    });
  }
  return queryParams;
};
