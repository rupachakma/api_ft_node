export const testController = (req, res) => {
    res.status(200).send({
        message: "Hello from controller",
        success: true,
    })
}