const responseData = (res: any, status: number, message: string, content: any) => {
    res.status(status).json({
        statusCode: status,
        message,
        content,
        dateTime: new Date()
    })
};

export default responseData;