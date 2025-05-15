router.get('/revenue/:customerId', async (req, res) => {
  const customerId = req.params.customerId;

  const revenue = await Order.aggregate([
    { $match: { customerId: mongoose.Types.ObjectId(customerId) } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    { $unwind: "$productDetails" },
    {
      $group: {
        _id: "$customerId",
        totalRevenue: {
          $sum: { $multiply: ["$items.quantity", "$productDetails.price"] }
        }
      }
    }
  ]);
  res.json(revenue);
});
